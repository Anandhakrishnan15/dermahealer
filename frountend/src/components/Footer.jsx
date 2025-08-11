"use client";
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[var(--bg)] text-[var(--text)] py-2 px-2">
            <div className=" mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">

                {/* Logo */}
                <div className="flex items-center space-x-3">
                    {/* <img
                        src="your-logo-url.png"
                        alt="DermaHealer Logo"
                        className="h-10 w-auto object-contain"
                    /> */}
                    <span className="font-semibold text-xl select-none">DermaHealer</span>
                </div>

                {/* Copyright */}
                <p className="text-sm select-none text-center md:text-base">
                    &copy; {new Date().getFullYear()} DermaHealer. All rights reserved.
                </p>

                {/* Built by with logo */}
                <div className="flex items-center space-x-2 text-sm text-center md:text-right opacity-70 select-none">
                    <span>
                        Built by{" "}
                        <a
                            href="www.linkedin.com/in/anandha-krishnan-5b0a36248"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-teal-400 transition"
                        >
                            Anandhakrishna
                        </a>
                    </span>
                    <img
                        src="https://ik.imagekit.io/e8fzvhk22/mylogo?updatedAt=1754921880920"
                        alt="Anandhakrishna Logo"
                        className="h-6 w-6 object-contain"
                    />
                </div>
            </div>
        </footer>
    );
}
