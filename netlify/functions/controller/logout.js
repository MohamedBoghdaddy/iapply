import { logoutUser } from "../controller/usercontroller.js";

export const handler = async (event) => {
  try {
    await logoutUser();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Logged out successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
