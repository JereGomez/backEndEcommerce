import jwt from 'jsonwebtoken';
import config from '../config/config.js'

function authorization (req, res, next){
  if(!req.headers['authorization']) {
    res.send('No authorization header')
  } 
  const bearerHeader = req.headers['authorization'];
  const token = (bearerHeader.split(' '))[1];
  if(bearerHeader != undefined && req.isAuthenticated()){ //req.session.user != undefined
      req.token = token;
      jwt.verify(token, config.claveSecreta, (err, data) =>{
        if(err){
          res.status(403).send('Invalid Token')
        }
        else{
          next();
        }
      });
    }
    else{
      res.status(403).send('Unouthorized, token missing or user not logged in');
    }

  
}


  export {authorization}