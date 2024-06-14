import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token_cookie;
    console.log("token",token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyUser;
