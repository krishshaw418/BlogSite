// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    req.user = decoded; 
    next();
  });
};

module.exports = authenticate;