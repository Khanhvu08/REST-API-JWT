const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var User = require("../models/user");
var config = require('../config/database');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('login',{layout:'main'})
});
router.get('/register',(req,res)=> {
  res.render('register',{layout:'main'})
});



router.post('/signup', async function (req, res) {
  if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' }); 
  } else {
      var newUser = new User({
          username: req.body.username,
          password: req.body.password
      });
      // save the user
      await newUser.save();
      res.json({ success: true, msg: 'Successful created new user.' });
  }
});





router.post('/signin', async function (req, res) {

  console.log(req.body);

  let user = await User.findOne({username: req.body.username});

  console.log(user);

  if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
  } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user.toJSON(), config.secret);
              // return the information including token as JSON
              res.json({ success: true, token: 'JWT ' + token });
          } else {
              res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
      });
  }
});

module.exports = router;
