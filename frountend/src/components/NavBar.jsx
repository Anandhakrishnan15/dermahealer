"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Sun, Moon } from "lucide-react";
import navbarDropdownData from "../data/navbarDropdoenData"; // ✅ data import

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const [dropdownOpen, setDropdownOpen] = useState(null); // top-level
    const [nestedOpenPath, setNestedOpenPath] = useState(null); // nested via path
    const navRef = useRef(null);
    const pathname = usePathname();

    // Close menus when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setDropdownOpen(null);
                setNestedOpenPath(null);
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Load saved theme
    useEffect(() => {
        const saved = localStorage.getItem("theme") || "light";
        setTheme(saved);
        document.documentElement.classList.toggle("dark", saved === "dark");
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    return (
        <nav
            ref={navRef}
            className="w-full shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-90"
            style={{ backgroundColor: "var(--navbar-bg)", color: "var(--navbar-text)" }}
        >
            {/* LEFT: Logo + Brand */}
            <div className="flex items-center ">
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <img
                        src="/logo2.png"
                        alt="My Logo"
                        width={50}
                        height={50}
                        className="object-contain"
                        loading="eager"
                    />
                </Link>
                <h1 className="text-2xl font-bold flex items-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                        Derma
                    </span>
                    <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                        Healer
                    </span>
                </h1>
            </div>

            {/* CENTER: Desktop Nav */}
            <div className="hidden md:flex space-x-6 items-center">
                <NavLinks
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={(val) => {
                        setDropdownOpen(val);
                        setNestedOpenPath(null);
                    }}
                    nestedOpenPath={nestedOpenPath}
                    setNestedOpenPath={setNestedOpenPath}
                    onLinkClick={() => {
                        setIsOpen(false);
                        setDropdownOpen(null);
                        setNestedOpenPath(null);
                    }}
                    pathname={pathname}
                />
            </div>

            {/* RIGHT: Theme + Mobile Button */}
            <div className="flex items-center space-x-3">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded focus:outline-none"
                    style={{ backgroundColor: "var(--toggle-bg)", color: "var(--toggle-text)" }}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div
                    className="fixed top-0 right-0 h-full w-78 flex flex-col items-start space-y-2 py-6 px-4 md:hidden overflow-y-clip"
                    style={{
                        backgroundColor: "var(--bg)",
                        color: "var(--navbar-text)",
                        boxShadow: "var(--navbar-shadow)",
                    }}
                >
                    <NavLinks
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={(val) => {
                            setDropdownOpen(val);
                            setNestedOpenPath(null);
                        }}
                        nestedOpenPath={nestedOpenPath}
                        setNestedOpenPath={setNestedOpenPath}
                        mobile
                        onLinkClick={() => {
                            setIsOpen(false);
                            setDropdownOpen(null);
                            setNestedOpenPath(null);
                        }}
                        pathname={pathname}
                    />
                </div>
            )}
        </nav>
    );
}

/* ------------------------------
   NAV LINKS
------------------------------ */
function NavLinks({ dropdownOpen, setDropdownOpen, nestedOpenPath, setNestedOpenPath, mobile, onLinkClick, pathname }) {
    const links = [
        { href: "/", label: "Home" },
        { dropdown: true, label: "Treatments" },
        { href: "/blog", label: "Blog" },
        { href: "/about-us", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
    ];

    return (
        <div className={`${mobile ? "flex flex-col w-full" : "flex"} items-start`}>
            {links.map((link, idx) =>
                link.dropdown ? (
                    <div key={idx} className="relative">
                        <button
                            onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                            className={`flex items-center justify-between ${mobile ? "w-68" : ""} px-3 py-2 hover:underline `}
                            style={{ color: "var(--navbar-link)" }}
                        >
                            {link.label}
                            <ChevronDown
                                size={14}
                                className={`${dropdownOpen === link.label ? "rotate-180" : ""} transition-transform`}
                            />
                        </button>

                        {dropdownOpen === link.label && (
                            <div
                                className={`absolute right-0 mt-0 rounded border shadow-lg z-20 ${mobile ? "static w-full" : "w-60"} text-left`}
                                style={{
                                    backgroundColor: "var(--navbar-bg)",
                                    boxShadow: "var(--card-shadow)",
                                    border: `1px solid var(--card-border)`,
                                }}
                            >
                                {navbarDropdownData.map((item, i) => (
                                    <DropdownItem
                                        key={i}
                                        item={item}
                                        mobile={mobile}
                                        pathname={pathname}
                                        onLinkClick={onLinkClick}
                                        path=""
                                        nestedOpenPath={nestedOpenPath}
                                        setNestedOpenPath={setNestedOpenPath}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <LinkItem key={link.href} href={link.href} label={link.label} onClick={onLinkClick} active={pathname === link.href} />
                )
            )}
        </div>
    );
}

/* ------------------------------
   DROPDOWN ITEM (recursive)
------------------------------ */
function DropdownItem({ item, mobile, pathname, onLinkClick, path, nestedOpenPath, setNestedOpenPath }) {
    const currentPath = path ? `${path} > ${item.label}` : item.label;
    const isOpen =
        nestedOpenPath && (nestedOpenPath === currentPath || nestedOpenPath.startsWith(currentPath + " > "));

    if (item.items) {
        const toggle = () => {
            if (isOpen) {
                setNestedOpenPath(path || null);
            } else {
                setNestedOpenPath(currentPath);
            }
        };

        return (
            <div className="relative w-full">
                <button
                    onClick={toggle}
                    className={`flex items-center rounded-md justify-between w-full px-4 py-2 text-left  ${isOpen ? " bg-[var(--primary-color)]" : "hover:bg-[var(--primary-color)]"}`}
                >
                    <span className="truncate">{item.label}</span>
                    <ChevronRight size={14} className={`${isOpen ? "rotate-90" : ""} transition-transform`} />
                </button>

                {isOpen && (
                    <div
                        className={`absolute left-full top-0 mt-0 rounded shadow-lg z-30 ${mobile ? "static w-full" : "w-60"} text-left`}
                        style={{
                            backgroundColor: "var(--bg)",
                            boxShadow: "var(--card-shadow)",
                            border: `1px solid var(--border)`,
                        }}
                    >
                        {item.items.map((child, idx) => (
                            <DropdownItem
                                key={idx}
                                item={child}
                                mobile={mobile}
                                pathname={pathname}
                                onLinkClick={onLinkClick}
                                path={currentPath}
                                nestedOpenPath={nestedOpenPath}
                                setNestedOpenPath={setNestedOpenPath}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return <LinkItem href={item.href} label={item.label} onClick={() => { onLinkClick(); setNestedOpenPath(null); }} active={pathname === item.href} />;
}

/* ------------------------------
   LINK ITEM
------------------------------ */
function LinkItem({ href, label, onClick, active }) {
    return (
        <Link
            href={href}
            className={`block px-4 py-2 rounded-md transition-colors hover:underline hover:bg-[var(--primary-color)] text-left ${active ? "bg-[var(--primary-color)]" : "text-[var(--navbar-link)]"}`}
            onClick={onClick}
        >
            {label}
        </Link>
    );
}

/* ------------------------------
   THEME TOGGLE
------------------------------ */
function ThemeToggle({ theme, toggleTheme }) {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-transform duration-200 hover:scale-110"
            aria-label="Toggle theme"
            title="Toggle theme"
        >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}