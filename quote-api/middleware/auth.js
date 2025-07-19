import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
  const token = req.header("auth");

  if (!token) {
    return res.status(400).json({
      message: "first login",
      success: false,
    });
  }

  const jwtverify = jwt.verify(token, process.env.JWT_KEY);
  if (!jwtverify) {
    return res.status(400).json({
      message: "invalid token",
      success: false,
    });
  }

  next();
};
