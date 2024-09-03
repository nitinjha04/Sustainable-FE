import apiClient from "../config/apiClient";

class FileUploadService {
  upload = async (data) => {
    const newForm = new FormData();
    newForm.append("file", data);
    return apiClient.post("/upload-image", newForm);
  };
}

export default new FileUploadService();
