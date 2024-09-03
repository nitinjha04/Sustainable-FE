import apiClient from "../config/apiClient";

class UserService {
  getCurrentUser = async () => {
    return apiClient.get("/users/own");
  };
}

export default new UserService();
