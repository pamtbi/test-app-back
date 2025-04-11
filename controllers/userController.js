import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: user._id,
      username: user.username,
      role: user.role,
    });

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};