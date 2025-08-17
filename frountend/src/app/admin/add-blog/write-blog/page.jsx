"use client";

import React, { useState, useRef } from "react";

export default function BlogEditor() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [sections, setSections] = useState([
        { heading: "Introduction", subHeading: "", content: "<p></p>" },
    ]);

    const editorRefs = useRef([]);
    const [activeSection, setActiveSection] = useState(0);

    // Image upload
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImage(ev.target.result);
        reader.readAsDataURL(file);
    };

    // Update section content
    const handleSectionInput = (idx) => {
        const updated = [...sections];
        updated[idx].content = editorRefs.current[idx].innerHTML.replace(/<p><\/p>/g, "");
        setSections(updated);
    };

    // Add new section
    const addSection = () => {
        setSections([...sections, { heading: "New Section", subHeading: "", content: "<p></p>" }]);
    };

    // Toolbar command
    const execCommand = (command) => {
        const editor = editorRefs.current[activeSection];
        if (!editor) return;
        editor.focus();

        if (command === "insertOrderedList") {
            document.execCommand("insertOrderedList");
        } else if (command === "insertUnorderedList") {
            document.execCommand("insertUnorderedList");
        } else if (["H1", "H2", "H3"].includes(command)) {
            document.execCommand("formatBlock", false, command);
        } else {
            document.execCommand(command);
        }

        handleSectionInput(activeSection);
    };

    // Save static blog
    const handleSave = () => {
        const payload = { title, author, date, image, sections, savedAt: new Date().toISOString() };
        console.log("Saved Blog:", payload);
        alert("Blog saved! Check console for data to use as static blog.");
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md">
            {/* Title, Author, Date */}
            <input
                type="text"
                placeholder="Blog Title..."
                className="w-full text-3xl md:text-4xl font-bold bg-transparent outline-none text-slate-900 dark:text-slate-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Author..."
                    className="flex-1 text-sm md:text-base bg-transparent outline-none text-slate-700 dark:text-slate-300"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Date..."
                    className="flex-1 text-sm md:text-base bg-transparent outline-none text-slate-700 dark:text-slate-300"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {/* Main Image */}
            <div className="flex items-center gap-4">
                <label className="cursor-pointer px-3 py-2 border rounded-md bg-slate-50 dark:bg-slate-800">
                    Upload Image
                    <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageUpload} />
                </label>
                {image && (
                    <div className="relative">
                        <img src={image} alt="Main" className="max-w-xs max-h-60 rounded-md object-cover shadow" />
                        <button
                            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => setImage(null)}
                        >
                            X
                        </button>
                    </div>
                )}
            </div>

            {/* Sections */}
            {sections.map((sec, idx) => (
                <div
                    key={idx}
                    className={`space-y-2 border-b pb-4 ${activeSection === idx ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) => {
                                const updated = [...sections];
                                updated[idx].heading = e.target.value;
                                setSections(updated);
                            }}
                            className="text-2xl font-bold bg-transparent outline-none flex-1"
                            placeholder="Section Heading"
                        />
                        <button onClick={addSection} className="px-2 py-1 bg-green-500 text-white rounded text-sm">
                            + Section
                        </button>
                    </div>

                    <input
                        type="text"
                        value={sec.subHeading}
                        onChange={(e) => {
                            const updated = [...sections];
                            updated[idx].subHeading = e.target.value;
                            setSections(updated);
                        }}
                        placeholder="Subheading (optional)"
                        className="w-full text-base bg-transparent outline-none text-slate-600 dark:text-slate-400"
                    />

                    {/* Toolbar */}
                    <div className="flex gap-2 mb-1">
                        <button onClick={() => execCommand("bold")} className="px-2 py-1 border rounded font-bold">B</button>
                        <button onClick={() => execCommand("italic")} className="px-2 py-1 border rounded italic">I</button>
                        <button onClick={() => execCommand("underline")} className="px-2 py-1 border rounded underline">U</button>
                        <button onClick={() => execCommand("H1")} className="px-2 py-1 border rounded">H1</button>
                        <button onClick={() => execCommand("H2")} className="px-2 py-1 border rounded">H2</button>
                        <button onClick={() => execCommand("H3")} className="px-2 py-1 border rounded">H3</button>
                        <button onClick={() => execCommand("insertUnorderedList")} className="px-2 py-1 border rounded">• UL</button>
                        <button onClick={() => execCommand("insertOrderedList")} className="px-2 py-1 border rounded">1. OL</button>
                    </div>

                    {/* Editable content */}
                    <div
                        ref={(el) => (editorRefs.current[idx] = el)}
                        className="p-4 border rounded-md min-h-[80px] prose dark:prose-invert max-w-full"
                        contentEditable
                        dangerouslySetInnerHTML={{ __html: sec.content }}
                        onFocus={() => setActiveSection(idx)}
                        onInput={() => handleSectionInput(idx)}
                    />
                </div>
            ))}

            {/* Save Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleSave}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
                >
                    Save Blog
                </button>
            </div>

            {/* Preview */}
            <div className="mt-8 border rounded-lg p-6 bg-slate-50 dark:bg-slate-800 prose dark:prose-invert shadow-inner">
                <h1 className="text-4xl font-bold">{title || "Title Preview"}</h1>
                <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span>{author || "Author Preview"}</span> | <span>{date || "Date Preview"}</span>
                </div>
                {image && <img src={image} alt="Preview" className="max-w-sm max-h-60 rounded-md object-cover mb-4 shadow" />}
                {sections.map((s, i) => (
                    <div key={i} className="mb-4">
                        <h2>{s.heading}</h2>
                        {s.subHeading && (
                            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">{s.subHeading}</h3>
                        )}
                        <div dangerouslySetInnerHTML={{ __html: s.content }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
