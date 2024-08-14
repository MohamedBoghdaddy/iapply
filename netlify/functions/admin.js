import { authorizeRoles } from "./Middleware/authMiddleware.js"; // Adjusted path

export const handler = async (event) => {
  try {
    const user = await authorizeRoles(event.headers.authorization, ["admin"]);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Welcome, Admin!" }),
    };
  } catch (error) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden" }),
    };
  }
};
