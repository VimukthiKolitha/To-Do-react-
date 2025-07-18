import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotEnv from 'dotenv'
import Users from './Module/Users.js'
import Tasks from './Module/Tasks.js'
import jwt from 'jsonwebtoken' 
import  bcrypt from 'bcrypt'
import {verify} from './middleware/auth.js'
dotEnv.config()
const App = express();

const URL = process.env.URL;
const PORT = process.env.PORT || 5000;
const Secreat_key = process.env.jwt_Secret;
App.use(cors());
App.use(express.json());

//DB connection
const connectDB = async() =>{
    try {
        await mongoose.connect(URL);
        console.log("mongoDB connection success..!")
    } catch (error) {
         console.log(`connection fail :${error}`)
    }
}

//// Start server after DB connection
connectDB().then(()=>{
   try {
     App.listen(PORT)
     console.log(`DB connected via ${PORT}`)

   } catch (error) {
     console.log(`Port failed:${error}`);
   }
})


//Api for register user
App.post('/createAccount',async (req,res) =>{
  const {Email,Password} = req.body; //Extracts email and password sent from the frontend
  try {
      const existing = await Users.findOne({Email})
      
      if(existing)
      {
        return res.status(400).json({error:'Already have an account'})
      }

      const hashpassword = await bcrypt.hash(Password,10);  // 1).This 10 is called the salt rounds (cost factor). 2).It determines how many times the hashing process is applied internally. 3).10 is a reasonable and industry-standard default for secure, efficient hashing.
      const newUser = new Users({Email,Password:hashpassword});
        await newUser.save();
      //                      payload        secreat key   expired time 
      const token = jwt.sign({id:newUser._id},Secreat_key,{expiresIn:'48h'});
    
      res.status(201).json({message:'Account created successfully',token})
  } catch (error) {
    console.error(error);
    res.status(500).json({error:`Account creation faild:${error}`})
  }
})

//Api for Login
App.post('/Login',async (req,res)=>{

    const {Email,Password} = req.body;
  try {
    /* inside this  existing veriable it hold all user details
    Ex:-
       {
       _id: ObjectId("66ab23a17f8c13c3e23b5f98"),
        Email: "abc@gmail.com",
       Password: "$2b$10$WqD2...hashedpassword...",
      __v: 0
      }
    */
     const existing = await Users.findOne({Email})
     const hashpass = await bcrypt.compare(Password,existing.Password);
   if(existing && hashpass)
   {
      const token = jwt.sign({id:existing._id},Secreat_key,{expiresIn: '48h'});
    return res.status(200).json({message:'Login successfull',token,user:{id:existing._id,Email:existing.Email}}) //purpose of send id and email is we can identify what user loged in
   }
   else{
      return res.status(200).json({message:'Login faild'})
   }
    
  } catch (error) {
    res.status(500).json({error:`something went wrong ${error}`})
  }

})

//Add task
App.post('/Task',verify,async(req,res) =>{
     const {work} = req.body;
     const userId = req.user.id; // retrieved from decoded token

    
  try {
    
      const newTask = new Tasks({work,userId});
      await newTask.save();

      res.status(200).json({message:'Task added success..!'})
  } catch (error) {
     res.status(500).json({error:`something went wrong:${error}`})
  }
})

//displsy task
App.get('/display',verify,async(req,res) =>{
     
       const id = req.user.id; 
       
  try {
     
      const list =  await Tasks.find({userId:id}) 
      res.status(200).json({list});
  } catch (error) {
     res.status(500).json({error:`something went wrong:${error}`})
  }
})

//delete task

App.delete('/Task-delete/:id',verify,async (req,res) =>{
      const {id} = req.params;
      
  try {
      await Tasks.findByIdAndDelete(id)
      res.status(200).json({message:"Delete successfull..!"})
  } catch (error) {
    res.status(500).json({error:`something went wrong`})
  }
})

//change status
App.post('/Action/:id',verify,async (req,res) =>{
  const {id} = req.params;
  const {action} = req.body;
  try {
    await Tasks.findByIdAndUpdate(id ,{action})

    res.status(200).json({message:"status changed..!"})
  } catch (error) {
    res.status(500).json({error:`mothing went wrong:${error}`})
  }
})

//update task
App.post('/edit/:id',verify,async (req,res) =>{
  const {id} = req.params;
  const {work} = req.body;
  
  try {
      
    await Tasks.findByIdAndUpdate(id,{work})
    
    res.status(200).json({message:'updated success..!'})
  } catch (error) {
    res.status(500).json({error:`something went wrong:${error}`})
  }
})
