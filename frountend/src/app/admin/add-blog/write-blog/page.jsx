"use client";

import React, { useState, useRef, useEffect } from "react";

export default function RichTextEditor({ onSaveCallback }) {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [image, setImage] = useState(null); // base64
    const [formats, setFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        h1: false,
        h2: false,
        h3: false,
        bulletList: false,
        numberedList: false,
        blockquote: false,
        link: false,
    });

    const editorRef = useRef(null);

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        updateFormats();
    };

    const insertLink = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            alert("Please select text to add a link");
            return;
        }
        let url = prompt("Enter the URL");
        if (url) {
            execCommand("createLink", url);
        }
    };

    const undo = () => document.execCommand("undo");
    const redo = () => document.execCommand("redo");

    const updateFormats = () => {
        if (!editorRef.current) return;
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            setFormats({
                bold: false,
                italic: false,
                underline: false,
                h1: false,
                h2: false,
                h3: false,
                bulletList: false,
                numberedList: false,
                blockquote: false,
                link: false,
            });
            return;
        }

        setFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            h1: checkFormatBlock("H1"),
            h2: checkFormatBlock("H2"),
            h3: checkFormatBlock("H3"),
            bulletList: document.queryCommandState("insertUnorderedList"),
            numberedList: document.queryCommandState("insertOrderedList"),
            blockquote: checkFormatBlock("BLOCKQUOTE"),
            link: checkLinkActive(),
        });
    };

    const checkFormatBlock = (tagName) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        let node = selection.anchorNode;
        while (node) {
            if (node.nodeType === 1 && node.tagName === tagName) return true;
            node = node.parentNode;
        }
        return false;
    };

    const checkLinkActive = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
        let node = selection.anchorNode;
        while (node) {
            if (node.nodeType === 1 && node.tagName === "A") return true;
            node = node.parentNode;
        }
        return false;
    };

    const handleImageUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert("Only JPG/PNG images are allowed.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => setImage(ev.target.result);
        reader.readAsDataURL(file);
    };

    // Remove uploaded image
    const removeImage = () => setImage(null);

    const handleSave = () => {
        const content = editorRef.current?.innerHTML || "";
        const payload = {
            title,
            subtitle,
            image,
            content,
            savedAt: new Date().toISOString(),
        };
        console.log("Saved data:", payload);
        if (onSaveCallback) onSaveCallback(payload);
    };

    useEffect(() => {
        const handler = () => updateFormats();
        document.addEventListener("selectionchange", handler);
        return () => document.removeEventListener("selectionchange", handler);
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md space-y-6">
            {/* Title */}
            <input
                type="text"
                className="w-full text-3xl md:text-4xl font-extrabold bg-transparent outline-none placeholder:italic placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                placeholder="Add a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Subtitle */}
            <input
                type="text"
                className="w-full text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 bg-transparent outline-none placeholder:italic placeholder:text-slate-400"
                placeholder="Add a subtitle..."
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
            />

            {/* Image upload + preview with remove */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    <span className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                        Upload Image
                    </span>
                </label>

                {image ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={image}
                            alt="Preview"
                            className="max-w-[120px] max-h-24 rounded-md object-cover shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="px-2 py-1 rounded-md border border-red-400 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition"
                            aria-label="Remove uploaded image"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="text-sm text-slate-500">No image selected.</div>
                )}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 items-center border rounded-md p-2 bg-slate-50 dark:bg-slate-800">
                <button
                    type="button"
                    onClick={() => execCommand("bold")}
                    className={`px-2 py-1 rounded-md border ${formats.bold ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
                        }`}
                    title="Bold"
                >
                    <b>B</b>
                </button>

                <button
                    type="button"
                    onClick={() => execCommand("italic")}
                    className={`px-2 py-1 rounded-md border ${formats.italic ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
                        }`}
                    title="Italic"
                >
                    <i>I</i>
                </button>

                <button
                    type="button"
                    onClick={() => execCommand("underline")}
                    className={`px-2 py-1 rounded-md border ${formats.underline
                            ? "bg-slate-200 dark:bg-slate-700"
                            : "bg-transparent"
                        }`}
                    title="Underline"
                >
                    <u>U</u>
                </button>

                {/* Headings */}
                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "H1")}
                    className={`px-2 py-1 rounded-md border ${formats.h1 ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
                        }`}
                    title="Heading 1"
                >
                    H1
                </button>

                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "H2")}
                    className={`px-2 py-1 rounded-md border ${formats.h2 ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
                        }`}
                    title="Heading 2"
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => execCommand("formatBlock", "H3")}
                    className={`px-2 py-1 rounded-md border ${formats.h3 ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
                        }`}
                    title="Heading 3"
                >
                    H3
                </button>

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => execCommand("insertUnorderedList")}
                    className={`px-2 py-1 rounded-md border ${formats.bulletList
                            ? "bg-slate-200 dark:bg-slate-700"
                            : "bg-transparent"
                        }`}
                    title="Bulleted List"
                >
                    • List
                </button>

                <button
                    type="button"
                    onClick={() => execCommand("insertOrderedList")}
                    className={`px-2 py-1 rounded-md border ${formats.numberedList
                            ? "bg-slate-200 dark:bg-slate-700"
                            : "bg-transparent"
                        }`}
                    title="Numbered List"
                >
                    1. List
                </button>

                {/* Blockquote */}
                <button
                    type="button"
                    onClick={() =>
                        execCommand(formats.blockquote ? "formatBlock" : "formatBlock", formats.blockquote ? "P" : "BLOCKQUOTE")
                    }
                    className={`px-2 py-1 rounded-md border ${formats.blockquote
                            ? "bg-slate-200 dark:bg-slate-700"
                            : "bg-transparent"
                        }`}
                    title="Blockquote"
                >
                    ❝ Quote
                </button>

                {/* Link */}
                <button
                    type="button"
                    onClick={insertLink}
                    className={`px-2 py-1 rounded-md border ${formats.link ? "bg-slate-200 dark:bg-slate-700" : "bg-transparent"
                        }`}
                    title="Insert Link"
                >
                    🔗 Link
                </button>

                {/* Undo/Redo */}
                <button
                    type="button"
                    onClick={undo}
                    className="px-2 py-1 rounded-md border"
                    title="Undo"
                >
                    ↺
                </button>
                <button
                    type="button"
                    onClick={redo}
                    className="px-2 py-1 rounded-md border"
                    title="Redo"
                >
                    ↻
                </button>
            </div>

            {/* Content editable area */}
            <div
                ref={editorRef}
                className="min-h-[200px] p-4 border rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 overflow-auto prose dark:prose-invert max-w-full"
                contentEditable
                spellCheck={true}
                onInput={updateFormats}
                onClick={updateFormats}
                onKeyUp={updateFormats}
                onKeyDown={updateFormats}
                suppressContentEditableWarning={true}
                aria-label="Rich text editor"
            ></div>

            {/* Preview canvas-like area */}
            <div className="mt-6 border rounded-lg p-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 max-w-full prose dark:prose-invert shadow-inner">
                <h2 className="text-2xl font-bold mb-2">{title || "Title Preview"}</h2>
                <h3 className="text-xl font-semibold mb-4 text-slate-600 dark:text-slate-400">{subtitle || "Subtitle Preview"}</h3>
                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        className="max-w-sm max-h-60 rounded-md object-cover mb-4 shadow"
                    />
                )}
                <div
                    dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || "<p><i>Content preview...</i></p>" }}
                />
            </div>

            {/* Save button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
