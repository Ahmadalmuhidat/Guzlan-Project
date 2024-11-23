const jwt = require('jsonwebtoken');

const GenerateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const VerifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  GenerateToken,
  VerifyToken,
};
