"use client";

import { useEffect, useState } from "react";
import { User, Activity, Eye } from "lucide-react";

export default function VisitorStats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const cached = sessionStorage.getItem("visitorStats");
        if (cached) {
            setStats(JSON.parse(cached));
            return;
        }

        const fetchStats = async () => {
            try {
                const res = await fetch("/api/auth/analytics");
                const data = await res.json();

                const newStats = {
                    users: data.rows?.[0]?.metricValues?.[0]?.value || 0,
                    sessions: data.rows?.[0]?.metricValues?.[1]?.value || 0,
                    pageviews: data.rows?.[0]?.metricValues?.[2]?.value || 0,
                };

                setStats(newStats);
                sessionStorage.setItem("visitorStats", JSON.stringify(newStats));
            } catch (err) {
                console.error("Error fetching visitor stats:", err);
                setStats({ users: 0, sessions: 0, pageviews: 0 });
            }
        };

        fetchStats();
    }, []);

    const items = [
        { label: "Users", key: "users", icon: <User className="w-4 h-4" /> },
        { label: "Sessions", key: "sessions", icon: <Activity className="w-4 h-4" /> },
        { label: "Pageviews", key: "pageviews", icon: <Eye className="w-4 h-4" /> },
    ];

    return (
        <div className="flex items-center justify-between w-full max-w-xs text-gray-700 text-sm">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex flex-col items-center p-1 rounded cursor-default transform transition-transform duration-200 hover:scale-105"
                    title={item.label}
                >
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">{item.icon}</span>
                        {stats ? (
                            <span className="font-medium">{stats[item.key]}</span>
                        ) : (
                            // 🔥 Skeleton loader for numbers
                            <span className="w-6 h-4 bg-gray-300 animate-pulse rounded"></span>
                        )}
                    </div>
                    <span className="text-xs text-gray-400 mt-0.5">{item.label}</span>
                </div>
            ))}
        </div>
    );
}
