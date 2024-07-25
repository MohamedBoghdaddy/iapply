import User from "../models/UserModel.js";
import axios from "axios";
import textract from "textract";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

// Controller function to handle user update and resume upload
export const updateUserAndUploadResume = async (req, res) => {
  const { userId } = req.params;
  const {
    username,
    email,
    password,
    gender,
    receiveNotifications,
    profilePhoto,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    currentNationality,
    otherNationality,
    currentVisaStatus,
    disability,
    primaryEmailAddress,
    secondaryEmailAddress,
    primaryPhoneNumber,
    alternatePhoneNumber,
    currentAddress,
    country,
    city,
    zipCode,
    preferredJobTitle,
    preferredJobLocation,
    primarySkill,
    secondarySkill,
    yearsOfExperience,
    summary,
    workExperience,
    linkedin,
    github,
    education,
    cv,
    countries,
    jobTitles,
    applicationHistory,
  } = req.body;

  // Extract resume file if available
  const resumeFile = req.file;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Find the user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.receiveNotifications =
      receiveNotifications ?? user.receiveNotifications;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.firstName = firstName || user.firstName;
    user.middleName = middleName || user.middleName;
    user.lastName = lastName || user.lastName;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.currentNationality = currentNationality || user.currentNationality;
    user.otherNationality = otherNationality || user.otherNationality;
    user.currentVisaStatus = currentVisaStatus || user.currentVisaStatus;
    user.disability = disability || user.disability;
    user.primaryEmailAddress = primaryEmailAddress || user.primaryEmailAddress;
    user.secondaryEmailAddress =
      secondaryEmailAddress || user.secondaryEmailAddress;
    user.primaryPhoneNumber = primaryPhoneNumber || user.primaryPhoneNumber;
    user.alternatePhoneNumber =
      alternatePhoneNumber || user.alternatePhoneNumber;
    user.currentAddress = currentAddress || user.currentAddress;
    user.country = country || user.country;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.preferredJobTitle = preferredJobTitle || user.preferredJobTitle;
    user.preferredJobLocation =
      preferredJobLocation || user.preferredJobLocation;
    user.primarySkill = primarySkill || user.primarySkill;
    user.secondarySkill = secondarySkill || user.secondarySkill;
    user.yearsOfExperience = yearsOfExperience || user.yearsOfExperience;
    user.summary = summary || user.summary;
    user.workExperience = workExperience || user.workExperience;
    user.linkedin = linkedin || user.linkedin;
    user.github = github || user.github;
    user.education = education || user.education;
    user.countries = countries || user.countries;
    user.jobTitles = jobTitles || user.jobTitles;
    user.applicationHistory = applicationHistory || user.applicationHistory;

    // Hash the new password if it is provided
    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user to the database
    await user.save();

    // Handle resume file upload and processing if file is provided
    if (resumeFile) {
      const resumePath = path.join(
        __dirname,
        "../uploads",
        resumeFile.filename
      );

      // Move file to the desired location
      fs.renameSync(resumeFile.path, resumePath);

      // Extract text from the resume
      const resumeText = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(resumePath, (error, text) => {
          if (error) {
            return reject(error);
          }
          resolve(text);
        });
      });

      // Update user with resume text and URL
      user.cv = resumeText; // Save the extracted text in 'cv' field
      user.resumeUrl = resumePath; // Save file path or URL in the database
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

      return res.status(200).json({
        message:
          "User updated successfully, resume uploaded, text extracted, and applied to jobs successfully",
        response: response.data,
      });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(
      "Failed to update user, upload resume, and apply to jobs:",
      error
    );
    res.status(500).json({
      message: "Failed to update user, upload resume, and apply to jobs",
      error: error.message,
    });
  }
};

// Controller function to create a profile (if needed, though you have no profileModel.js)
export const createProfile = async (req, res) => {
  const { userId, bio, location, socialLinks } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Simulate profile creation as a part of the User model
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update user profile
export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { bio, location, socialLinks } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.socialLinks = socialLinks || user.socialLinks;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete user profile
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
