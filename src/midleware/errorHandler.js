function notFoundHandler(req, res) {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
}

function errorHandler(err, req, res, next) {
  console.log(err);

  res.status(500).json({
    error: "Server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
