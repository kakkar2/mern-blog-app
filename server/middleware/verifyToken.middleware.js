import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token);

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Need to login first.." });

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default verifyToken;
