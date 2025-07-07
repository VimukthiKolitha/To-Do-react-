import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotEnv from 'dotenv'
import Users from './Module/Users.js'
import Tasks from './Module/Tasks.js'
dotEnv.config()
const App = express();

const URL = process.env.URL;
const PORT = process.env.PORT || 5000;

App.use(cors());
App.use(express.json());

//DB connection
const connectDB = async() =>{
    try {
        await mongoose.connect(URL);
        console.log("mongoDB connection success..!")
    } catch (error) {
         console.log("connection fail :(")
    }
}

//// Start server after DB connection
connectDB().then(()=>{
   try {
     App.listen(PORT)
     console.log(`DB connected via ${PORT}`)

   } catch (error) {
     console.log("Port failure...");
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
      
      const newUser = new Users({Email,Password});
      await newUser.save();
      res.status(201).json({message:'Account created successfully'})
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Account creation faild'})
  }
})

//Api for Login

App.post('/Login',async (req,res)=>{

    const {Email,Password} = req.body;
  try {
     const existing = await Users.findOne({Email,Password})

   if(existing)
   {
    return res.status(200).json({message:'Login successfull'})
   }
   else{
    return res.status(401).json({erro:'login unsuccesssfull'})
   }
  } catch (error) {
    res.status(500).json({error:'something went wrong'})
  }

})


//Add task

App.post('/Task',async(req,res) =>{
     const {Todo} = req.body;
  try {
      const newTask = new Tasks({Todo});
      await newTask.save();

      res.status(200).json({message:'Task added success..!'})
  } catch (error) {
     res.status(500).json({error:'something went wrong..!'})
  }
})

//displsy task

App.get('/display',async(req,res) =>{
  try {
      const list =  await Tasks.find()

      res.status(200).json({list});
  } catch (error) {
     res.status(500).json({error:'something went wrong..!'})
  }
})

//delete task

App.delete('/Task-delete/:id',async (req,res) =>{
      const {id} = req.params;
  try {
      await Tasks.findByIdAndDelete(id)

      res.status(200).json({message:"Delete successfull..!"})
  } catch (error) {
    res.status(500).json({error:'something went wrong'})
  }
})