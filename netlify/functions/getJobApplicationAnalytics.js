// netlify/functions/getJobApplicationAnalytics.js
import { getJobApplicationAnalytics } from "./controller/analyticsController.js";

export const handler = async (event) => {
  try {
    const data = await getJobApplicationAnalytics();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
