const jwt = require('jsonwebtoken');
const { jwtSecrets } = require('../config/sercrets.js');

module.exports = (req, res, next) => {
  const {authorization} = req.headers
  if (authorization){
    jwt.verify(authorization, jwtSecrets, (err, decodedToken) => {
      if(err){
        res.status(401).json({you: "invalid credentials"})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
  res.status(400).json({ message: 'no credentials provided' });
  }
};
