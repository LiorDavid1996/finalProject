import axios from "axios";

export const uploadImages = async (formData, path, token) => {
  try {
    
    const { data } = await axios.post(
      `http://localhost:8080/Images/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
