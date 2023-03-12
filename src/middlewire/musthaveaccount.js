import jwt from 'jsonwebtoken';
import  User from "../model/userModel.js";

import dotenv from "dotenv";
dotenv.config();
export default async(req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if(token){
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const  user  =  await User.findById(decodedToken.id);
      next();
    } else{
      return res.status(401).json({ message: 'please! create an account' });
    }
  
  } catch (err) {
    return res.status(401).json({ message: 'error' });
  }
};