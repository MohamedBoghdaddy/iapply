import { checkAuth } from "./controller/usercontroller.js"; // Adjusted path

export const handler = async (event) => {
  try {
    const user = await checkAuth(event.headers.authorization);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }
};
