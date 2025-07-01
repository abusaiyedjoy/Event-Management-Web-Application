import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://event-management-web-application.vercel.app",
});

export default function useAxiosPublic() {
  return axiosPublic;
}
