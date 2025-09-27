"use client";
import React, { useRef, useLayoutEffect, useState } from "react";

export const InfiniteRow = ({ children, reverse = false, speed = 0}) => {
    const containerRef = useRef(null);
    const [duration, setDuration] = useState("0s"); // default

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.scrollWidth / 3; // adjust for 3x repeat
        setDuration(`${width / speed}s`);
    }, [children, speed]);

    // Repeat 4x so even on manual scroll, no blank space is shown
    const repeatedChildren = Array(4)
        .fill(null)
        .flatMap(() => children);

    return (
        <div
            className="
        w-full
        overflow-x-auto overflow-y-hidden
        touch-pan-x
        scrollbar-hide
      "
            ref={containerRef}
        >
            <div
                className={`
          flex w-max space-x-20 scrollbar-hide
          animate-scroll ${reverse ? "animate-scroll-reverse" : ""}
        `}
                style={{ animationDuration: duration }}
            >
                {repeatedChildren.map((child, i) =>
                    React.cloneElement(child, { key: i })
                )}
            </div>
        </div>
    );
};
