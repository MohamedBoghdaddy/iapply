import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Dashboard from "../models/DashboardModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const createUser = async (req, res) => {
  const { username, email, password, gender } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

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

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logout successful" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch current user error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { userId } = req.params; // Adjusted parameter name
  const { username, email, password, gender } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Check if the new email is already used by another user
    const existingUserWithEmail = await User.findOne({ email });
    if (
      existingUserWithEmail &&
      existingUserWithEmail._id.toString() !== userId
    ) {
      return res
        .status(400)
        .json({ message: "Email is already in use by another customer" });
    }

    // Find the user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.username = username;
    user.email = email;
    user.gender = gender;

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

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Function to delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by id and delete
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

export const getDashboard = (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
};
