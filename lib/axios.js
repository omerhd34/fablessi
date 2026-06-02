import axios from "axios";

const baseURL =
 process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

const apiClient = axios.create({
 baseURL,
 timeout: 30000,
 headers: {
  "Content-Type": "application/json",
  Accept: "application/json",
 },
});

apiClient.interceptors.request.use(
 (config) => config,
 (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
 (response) => response,
 (error) => {
  const message =
   error.response?.data?.message ??
   error.message ??
   "Beklenmeyen bir ağ hatası oluştu.";
  return Promise.reject(
   Object.assign(error, {
    userMessage: message,
   })
  );
 }
);

export default apiClient;
