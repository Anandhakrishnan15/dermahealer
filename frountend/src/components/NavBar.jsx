"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { treatmentsData } from "../data/treatmentsData";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [subDropdownOpen, setSubDropdownOpen] = useState(null);

    const navRef = useRef(null);
    const pathname = usePathname();

    // Close dropdown & mobile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setDropdownOpen(null);
                setSubDropdownOpen(null);
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <nav
            ref={navRef}
            className="w-full shadow-md px-4 py-3 flex items-center justify-between z-50 sticky top-0"
            style={{ backgroundColor: "var(--navbar-bg)", color: "var(--navbar-text)" }}
        >
            {/* LEFT: Logo */}
            <div className="flex items-center">
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <img
                        src="/logo2.png"   // ✅ Place your logo inside public/logo.png
                        alt="My Logo"
                        width={50}       // adjust as needed
                        height={10}
                        className="object-contain"
                        loading="eager"
                    />
                </Link>
            </div>

            {/* CENTER: Nav Links */}
            <div className="hidden md:flex space-x-6 items-center text-start">
                <NavLinks
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    subDropdownOpen={subDropdownOpen}
                    setSubDropdownOpen={setSubDropdownOpen}
                    onLinkClick={() => {
                        setIsOpen(false);
                        setDropdownOpen(null);
                        setSubDropdownOpen(null);
                    }}
                    pathname={pathname}
                />
            </div>

            {/* RIGHT: Theme + Menu */}
            <div className="flex items-center space-x-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 z-20 rounded focus:outline-none"
                    style={{
                        backgroundColor: "var(--toggle-bg)",
                        color: "var(--toggle-text)",
                    }}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className="fixed top-0 right-0 h-full w-64 flex flex-col items-center space-y-4 py-4 md:hidden transform transition-transform duration-300 ease-in-out"
                    style={{
                        backgroundColor: "var(--navbar-bg)",
                        color: "var(--navbar-text)",
                        boxShadow: "var(--navbar-shadow)",
                    }}
                >
                    <NavLinks
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                        subDropdownOpen={subDropdownOpen}
                        setSubDropdownOpen={setSubDropdownOpen}
                        mobile
                        onLinkClick={() => {
                            setIsOpen(false);
                            setDropdownOpen(null);
                            setSubDropdownOpen(null);
                        }}
                        pathname={pathname}
                    />
                </div>
            )}
        </nav>
    );
}

/* ------------------------------
   LINKS + DROPDOWN + NESTED DROPDOWN
------------------------------ */
function NavLinks({
    dropdownOpen,
    setDropdownOpen,
    subDropdownOpen,
    setSubDropdownOpen,
    mobile,
    onLinkClick,
    pathname,
}) {
    const links = [
        { href: "/", label: "Home" },
        { dropdown: true, label: "Treatments" },
        { href: "/blog", label: "Blog" },
        { href: "/about-us", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
        { href: "/admin", label: "Admin" },
    ];

    const NestedMenu = ({ label, items }) => (
        <div className={`relative group ${mobile ? "w-60" : ""}`}>
            <button
                onClick={() =>
                    setSubDropdownOpen(subDropdownOpen === label ? null : label)
                }
                className="flex items-center justify-between w-full px-4 py-2 hover:underline"
                style={{ color: "var(--navbar-link)" }}
            >
                {label} <ChevronRight size={14} />
            </button>
            {subDropdownOpen === label && (
                <div
                    className={`absolute left-full top-0 rounded shadow-lg ${mobile ? "static w-full" : "w-56"}`}
                    style={{
                        backgroundColor: "var(--navbar-bg)",
                        boxShadow: "var(--card-shadow)",
                        border: `1px solid var(--card-border)`,
                    }}
                >
                    {items.map((item, idx) => (
                        <div key={idx} className="px-0 py-1 hover:bg-[#aaf7ff95]">
                            <LinkItem
                                href={item.href}
                                label={item.label}
                                onClick={onLinkClick}
                                active={pathname === item.href}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className={`${mobile ? "flex flex-col space-y-4" : "flex space-x-3"} items-center`}>
            {links.map((link, idx) =>
                link.dropdown ? (
                    <div key={idx} className="relative group">
                        <button
                            onClick={() =>
                                setDropdownOpen(dropdownOpen === link.label ? null : link.label)
                            }
                            className="hover:underline flex items-center gap-1"
                            style={{
                                backgroundColor: "var(--navbar-bg)",
                                color: "var(--navbar-text)",
                            }}
                        >
                            {link.label} <ChevronDown size={14} />
                        </button>

                        {dropdownOpen === link.label && (
                            <div
                                className={`absolute py-2 rounded shadow-lg z-20 ${mobile ? "static w-full" : "w-66"}`}
                                style={{
                                    backgroundColor: "var(--navbar-bg)",
                                    boxShadow: "var(--card-shadow)",
                                    border: `1px solid var(--card-border)`,
                                }}
                            >
                                {treatmentsData.map((treatment, i) =>
                                    treatment.items ? (
                                        <NestedMenu
                                            key={i}
                                            label={treatment.label}
                                            items={treatment.items}
                                        />
                                    ) : (
                                        <LinkItem
                                            key={treatment.href}
                                            href={treatment.href}
                                            label={treatment.label}
                                            onClick={onLinkClick}
                                            active={pathname === treatment.href}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <LinkItem
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        onClick={onLinkClick}
                        active={pathname === link.href}
                    />
                )
            )}
        </div>
    );
}

function LinkItem({ href, label, onClick, active }) {
    return (
        <Link
            href={href}
            className={`block px-4 py-2 hover:underline rounded-md transition-colors ${active ? "text-[#4fdaea]" : "text-[var(--navbar-link)]"
                }`}
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
            className="relative w-12 h-6 rounded-full transition-colors duration-500"
            style={{
                backgroundColor: theme === "light" ? "#d1d5db" : "#374151",
            }}
        >
            <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-500 ease-in-out ${theme === "dark" ? "translate-x-6" : ""
                    }`}
            ></span>
        </button>
    );
}
