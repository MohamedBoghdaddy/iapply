import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export default { register };
