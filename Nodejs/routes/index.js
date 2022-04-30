var express = require('express');
var mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();


var user = require('../model/User');

const {registerValidation , loginValidation} = require('../validation');
const { use } = require('express/lib/application');
const { result } = require('@hapi/joi/lib/base');



router.post('/register', async function(req, res, next) {

  const {error} = registerValidation(req.body);
  if(error) return res.json("error "+error.details[0].message);

  //Check if the user is already in the DB
  user.find({'email':req.body.email}).count(function(err,number){
    if(number != 0){

      res.json('Email already exists');
      console.log('Email already exists');
    }
    else {

     
      //Hash password 
      bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
         var hashedPassword = hash;
         
           //Create new User
           new user({
                email : req.body.email,
                name : req.body.name,
                password : hashedPassword
                 }).save((err,newUser) => {
                   if (err) console.log("error message : " + err);
                   else {
                     res.json({user : newUser._id});
                    
                       }
                    });
           });
        });
     

         }

  })
  
});



router.post('/login' , async function(req,res)  {

  let result = {
    "error" : null,
    "name" : null,
    "password" : null,
    "token" : null
  };

  //validate
  const {error} = loginValidation(req.body);
  //if(error) return res.json("error "+error.details[0].message);
  if(error) return res.json(result.error = error.details[0].message);
   
//Check if the user is already in the DB

const userr = await user.findOne({'name' :req.body.name});
  if(!userr) return res.json(result.error='Username not found');
 
  //Password is correct 
  const validPass = await bcrypt.compare(req.body.password,userr.password);
  if(!validPass) return res.json(result.error='Invalid password');

  //CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({_id : userr._id}, process.env.TOKEN_SECRET);
  result.token=token;
  result._id=userr._id;
  result.password=userr.password;
  result.name=userr.name;
  res.header('authtoken',token).json(result);
  //res.cookie("authtoken",token,{httpOnly:true, secure:true});
  res.json('Logged in !');

});



module.exports = router;
