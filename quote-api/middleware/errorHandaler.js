export const errorHandaler = (err, req, res, next) => {
  return res.status(500).json({
    message: "internal server error",
    error: err.message,
    success: false,
  });
};
