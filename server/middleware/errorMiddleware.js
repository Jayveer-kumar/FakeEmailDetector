export const notFound = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error("❌ Server Error:", err);

  return res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
};