"use client";
import React, { useRef, useEffect } from "react";

export const InfiniteRow = ({ children, reverse = false, speed = 30 }) => {
    const containerRef = useRef(null);
    const animationFrameId = useRef(null);
    const pos = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Half the total scrollable width, because children are duplicated
        const totalWidth = container.scrollWidth / 2;

        const step = () => {
            pos.current += (reverse ? -1 : 1) * (speed / 60);

            // Use modulo for smooth looping
            pos.current = (pos.current + totalWidth) % totalWidth;

            container.style.transform = `translateX(${-pos.current}px)`;
            animationFrameId.current = requestAnimationFrame(step);
        };

        animationFrameId.current = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [reverse, speed]);

    return (
        <div
            ref={containerRef}
            className="flex space-x-20 w-max will-change-transform cursor-grab"
            style={{ userSelect: "none" }}
        >
            {[...children, ...children].map((child, i) =>
                React.cloneElement(child, { key: i })
            )}
        </div>
    );
};
