import { getSubscriptionAnalytics } from "./analyticsController.js";

export const handler = async () => {
  try {
    const analytics = await getSubscriptionAnalytics();
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
