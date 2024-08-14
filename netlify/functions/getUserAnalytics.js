import { getUserAnalytics } from "./controller/analyticsController.js";

export const handler = async (event) => {
  const userId = event.queryStringParameters.userId;

  try {
    const analytics = await getUserAnalytics(userId);
    return {
      statusCode: 200,
      body: JSON.stringify(analytics),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
