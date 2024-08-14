import { deleteUser } from "../controller/usercontroller.js";

export const handler = async (event) => {
  const userId = event.queryStringParameters.userId;

  try {
    await deleteUser(userId);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
