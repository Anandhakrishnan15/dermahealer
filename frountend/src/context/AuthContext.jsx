"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   // user info
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staff, setStaff] = useState(false); // track if user is staff

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (res.ok && data.user) {
                    setUser(data.user);
                    setIsLoggedIn(true);
                    setStaff(data.user.role === "staff"); // ✅ set staff true if role is staff
                } else {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setStaff(false);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setStaff(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
        setIsLoggedIn(true);
        setStaff(userData.role === "staff"); // ✅ set staff true on login
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        setStaff(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isLoggedIn, staff }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
