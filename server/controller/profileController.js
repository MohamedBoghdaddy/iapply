import axios from "axios";
import User from "../models/UserModel.js";
import textract from "textract";

// Controller function to handle resume upload and job application
const uploadResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle file upload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumePath = req.file.path;

    // Extract text from the resume
    const resumeText = await new Promise((resolve, reject) => {
      textract.fromFileWithPath(resumePath, (error, text) => {
        if (error) {
          return reject(error);
        }
        resolve(text);
      });
    });

    // Update user with resume text
    user.resume = resumeText;
    user.resumeUrl = resumePath; // Save file path or URL in database
    await user.save();

    // Call Python service to apply to jobs after uploading resume
    const preferences = {
      jobType: "full-time", // Example preference
      location: "remote", // Example preference
      industry: "IT", // Example preference
    };

    const response = await axios.post("http://localhost:5000/apply-to-jobs", {
      user_id: user._id,
      preferences: preferences,
    });

    res.status(200).json({
      message:
        "Resume uploaded, text extracted, and applied to jobs successfully",
      response: response.data,
    });
  } catch (error) {
    console.error(
      "Failed to upload resume, extract text, and apply to jobs:",
      error
    );
    res
      .status(500)
      .json({
        message: "Failed to upload resume, extract text, and apply to jobs",
        error,
      });
  }
};

export { uploadResume };
