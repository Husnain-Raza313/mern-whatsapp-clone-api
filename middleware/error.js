const errorHandler = (err, req, res, next) => {
  let status;
  const data = {
    success: false,
    message: err.message,
  };
  if (err.name === "MongoServerError" && err.code === 11000) {
    status = 409;
    const duplicateKeys = Object.keys(err.keyValue).join(", ");
    data.message = `${duplicateKeys} already taken`;
  }
  if (err.name === "ValidationError") {
    status = 400;
    data.message = err._message;
    data.validationErrors = Object.values(err.errors).map((val) => val.message);
  }
  const statusCode = status || res.statusCode;
  res.status(statusCode).json(data);
};
module.exports = {
  errorHandler,
};
