import axios from "axios";
import TokenHelper from "../helpers/Token.helper";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "https://sustainable-services.vercel.app/api", // Set your base URL here
  // baseURL: "http://localhost:53321/api", // Set your base URL here
});

// Request interceptor
apiClient.interceptors.request.use(async (request) => {
  if (!request.url.includes("/api/users/update/")) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${TokenHelper.get()}`,
    };
  }
  return request;
});

// Response interceptor
apiClient.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    // toast.error("Unexpected error occurred, please try again");
  }
  return Promise.reject(err);
});

export default apiClient;
