import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error));

    axiosSecure.interceptors.response.use(response => response, async error => {
        if (error.response.status === 401 || error.response.status === 403) {
            await signOutUser();
            navigate('/signin');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
