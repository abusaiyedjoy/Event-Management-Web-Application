import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://event-management-web-application-backend.onrender.com",
});

export default function useAxiosPublic() {
    return axiosPublic;
}
