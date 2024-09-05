import apiClient from "../config/apiClient";

class ContentService {
  create = async (data) => {
    return apiClient.post("/content", data);
  };
  getAll = async ({ type = "", category = "" }) => {
    return apiClient.get(`/content?type=${type}&category=${category}`);
  };
  getOwn = async ({ type = "", category = "" }) => {
    return apiClient.get(`/content/own?type=${type}&category=${category}`);
  };
  getParticular = async (id) => {
    return apiClient.get(`/content/${id}`);
  };

  like = async (data) => {
    return apiClient.post(`/content/like`, data);
  };
  comment = async (data) => {
    return apiClient.post(`/comment`, data);
  };
  update = async (id, data) => {
    return apiClient.put(`/content/${id}`, data);
  };
  delete = async (id, data) => {
    return apiClient.delete(`/content/${id}`);
  };
}

export default new ContentService();
