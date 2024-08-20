import { login } from "./usercontroller.js";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user = await login(body);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
