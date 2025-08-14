export const sendSuccess = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};
