const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware (req, res, next){
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, JWT_SECRET);

  if(decoded.id) {
    req.userId = decoded.id;
    next();
  } else {
    res.json({
      message: "You are not logged in!"
    })
  }
}

module.exports = {
  authMiddleware: authMiddleware
}