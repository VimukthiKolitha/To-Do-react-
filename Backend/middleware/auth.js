import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv';
dotEnv.config();
const Secreat_key = process.env.jwt_Secret;
export const verify = (req,res,next) =>{
  try {
      const header = req.headers.authorization;//In HTTP, Authorization is a request header used to send credentials or tokens from the client to the server
       
      if(!header)
      {
        return  res.status(401).json({error:`header not valid`});
      }
      const token = header.split(" ")[1]
      
       /*
      ex:-
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
      this is split in to array using space
      ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."]
      Bearer" → indicates the authentication scheme.
       [1] array size
      */
    jwt.verify(token,Secreat_key,(err,decord) =>{
        if(err)
    {
      
       return res.status(401).json({error:`token verify problem:${err}`})
    }

      req.user = decord // attach decoded data to req.user
       next()//req,res,next   next() is like saying “middleware done, continue to the next middleware or route handler.'
    });

  } catch (error) {
    res.status(500).json({error:`something went wrong :${error}`})
  }

}