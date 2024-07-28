import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const JWT_SECRET = process.env.JWT_SECRET; // Ensure JWT_SECRET is properly loaded from environment variables

const auth = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      // Find the user associated with the token
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.token = token;
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

export { auth, authorizeRoles };
