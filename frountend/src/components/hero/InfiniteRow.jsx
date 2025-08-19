"use client";
import React, { useRef, useLayoutEffect, useState } from "react";

export const InfiniteRow = ({ children, reverse = false, speed = 50 }) => {
    const containerRef = useRef(null);
    const [duration, setDuration] = useState("20s"); // default

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.scrollWidth / 2; // half (since duplicated)
        setDuration(`${width / speed}s`); // seconds = distance / speed(px/s)
    }, [children, speed]);

    return (
        <div className="overflow-visible w-full" ref={containerRef}>
            <div
                className={`
          flex w-max space-x-20 animate-scroll 
          ${reverse ? "animate-scroll-reverse" : ""}
        `}
                style={{ animationDuration: duration }}
            >
                {[...children, ...children].map((child, i) =>
                    React.cloneElement(child, { key: i })
                )}
            </div>
        </div>
    );
};
