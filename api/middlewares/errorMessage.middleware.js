export function errMessage(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errMsg = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: errMsg,
  });
}
