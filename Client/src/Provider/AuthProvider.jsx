/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || "https://event-management-web-application-backend.onrender.com";

    const register = async (name, email, password, photo) => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                photo,
            });

            // Automatically log in after registration
            return await login(email, password);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            setUser(user);

            return user;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser({ id: payload.id, email: payload.email }); // minimal user info from token
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const authInfo = {
        user,
        loading,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
