// netlify/functions/getAccountSettings.js
import mongoose from "mongoose";
import AccountSettings from "./models/AccountSettingsModel.js";

export const handler = async (event) => {
  try {
    const userId = event.queryStringParameters.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid user ID" }),
      };
    }

    const settings = await AccountSettings.findOne({ userId });

    if (!settings) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Settings not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(settings),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
