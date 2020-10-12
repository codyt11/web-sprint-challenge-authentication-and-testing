const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../user/user-model.js')
const jwt = require("jsonwebtoken");
const {jwtSecret} = require('../config/sercrets');
const secrets = require('../config/sercrets.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
  .then((user) => {
    console.log(user);
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json({errorMessage: err.message});
  })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;
  Users.findBy({username})
  .then(([user]) => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);
      res.status(200).json({message: 'Welcome', token});
    } else {
      res.status(401).json({message: 'Authentication failed'});
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: err.message})
  })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    lat: Date.now(),
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '1d',
  };
  const token = jwt.sign(payload, secret, options);
  return token;
}

module.exports = router;
