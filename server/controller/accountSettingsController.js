// controller/accountSettingsController.js

import AccountSettings from "../models/AccountSettingsModel.js";

// Controller to get account settings
export const getAccountSettings = async (req, res) => {
  try {
    const settings = await AccountSettings.findOne({ userId: req.user.id });
    if (!settings) {
      return res.status(404).json({ message: "Account settings not found" });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Controller to update account settings
export const updateAccountSettings = async (req, res) => {
  try {
    const settings = await AccountSettings.findOne({ userId: req.user.id });
    if (!settings) {
      return res.status(404).json({ message: "Account settings not found" });
    }

    // Update settings with the request body
    Object.assign(settings, req.body);
    await settings.save();

    res
      .status(200)
      .json({ message: "Account settings updated successfully", settings });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
