import { updateUser } from "./usercontroller.js";

export const handler = async (event) => {
  const userId = event.queryStringParameters.userId;
  const body = JSON.parse(event.body);

  try {
    const updatedUser = await updateUser(userId, body);
    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
