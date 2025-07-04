import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   Email:{type:String,required:true,unique:true},
   Password:{type:String,required:true,unique:false}
})
export default mongoose.model('Users',userSchema);