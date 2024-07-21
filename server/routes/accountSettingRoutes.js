import express from "express";
import AccountSettings from "../models/AccountSettingsModel.js";

const router = express.Router();

// Get account settings by userId
router.get("/:userId", async (req, res) => {
  try {
    const settings = await AccountSettings.findOne({
      userId: req.params.userId,
    });
    if (!settings)
      return res.status(404).json({ message: "Settings not found" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update account settings by userId
router.put("/:userId", async (req, res) => {
  try {
    let settings = await AccountSettings.findOne({ userId: req.params.userId });
    if (!settings) {
      settings = new AccountSettings({
        userId: req.params.userId,
        ...req.body,
      });
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
