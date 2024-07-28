import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const JWT_SECRET = process.env.JWT_SECRET;

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage }).single("resume");

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });

export const createUser = async (req, res) => {
  const { username, email, password, gender } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
    });
    await newUser.save();

    const token = createToken(newUser._id);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag for HTTPS
      sameSite: "strict",
    });

    // Respond with user data and token
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Logout failed", error: err.message });
    }
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  });
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
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
    countries,
    jobTitles,
    applicationHistory,
  } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

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

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    user.gender = gender || user.gender;

    await user.save();
    res.status(200).json({ message: "User profile updated successfully" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
