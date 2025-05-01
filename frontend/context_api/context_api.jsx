import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext();
const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const logoutTimer = useRef(null);

    // Safely get user from localStorage
    const getUserFromStorage = () => {
        try {
            const stored = localStorage.getItem("user");
            if (!stored) return null;

            const parsed = JSON.parse(stored);
            if (new Date().getTime() > parsed.expiry) {
                localStorage.removeItem("user");
                return null;
            }
            return parsed;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    };

    // Sync user on mount
    useEffect(() => {
        const storedUser = getUserFromStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Auto logout timer
    useEffect(() => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);

        if (user) {
            const timeLeft = user.expiry - new Date().getTime();
            logoutTimer.current = setTimeout(() => {
                logout();
            }, timeLeft);
        }

        return () => clearTimeout(logoutTimer.current);
    }, [user]);

    // Login
    const login = (userData) => {
        const userWithExpiry = {
            ...userData,
            expiry: new Date().getTime() + EXPIRY_TIME,
        };
        setUser(userWithExpiry);
        localStorage.setItem("user", JSON.stringify(userWithExpiry));
    };

    // Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
