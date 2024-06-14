import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup handler
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received signup request:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return res
      .status(200)
      .json({ user, message: "User created successfully", success: true });
  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Signin handler
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received signin request:", req.body);

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: validUser._id, email: validUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .cookie("token_cookie", token, { httpOnly: true })
      .json({ success: true, validUser });
  } catch (error) {
    console.error("Error during signin:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user info handler
const getUserInfo = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) {
      return res.status(404).json({ message: "User not authenticated" });
    }

    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signUp, signIn, getUserInfo };
