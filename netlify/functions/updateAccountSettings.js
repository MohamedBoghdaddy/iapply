// netlify/functions/updateAccountSettings.js
import mongoose from "mongoose";
import AccountSettings from "./models/AccountSettingsModel.js";

export const handler = async (event) => {
  try {
    const userId = event.queryStringParameters.userId;
    const body = JSON.parse(event.body);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid user ID" }),
      };
    }

    let settings = await AccountSettings.findOne({ userId });

    if (!settings) {
      settings = new AccountSettings({ userId, ...body });
    } else {
      Object.assign(settings, body);
    }

    await settings.save();

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
