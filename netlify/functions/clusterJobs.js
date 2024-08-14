import axios from "axios";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const response = await axios.post(
      "http://localhost:5000/api/cluster-jobs",
      body
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
