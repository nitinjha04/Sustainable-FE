import apiClient from "../config/apiClient";

class AuthService {
  login = async (data) => {
    return apiClient.post("/users/login", data);
  };

  signup = async (data) => {
    return apiClient.post("/users/create", {
      ...data,
    });
  };

  loginWithGoogle = async () => {
    try {
      // Open the Google authentication URL
      window.open(`http://localhost:53321/api/users/google`, "_self");
    } catch (error) {
      console.error("Error initiating Google authentication:", error);
    }
  };
}

export default new AuthService();
