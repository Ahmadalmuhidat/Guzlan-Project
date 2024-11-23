const BasicMiddleware = (req, res, next) => {
  console.log("This is a JWT middleware");

  next();
};

module.exports = BasicMiddleware;
