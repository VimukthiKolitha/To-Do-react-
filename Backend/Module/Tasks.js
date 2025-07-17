import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema({
    work:{type:String,required:true},
    action:{type:Boolean,default:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true} //Each user should only see their own todos
})
export default mongoose.model('Tasks',TasksSchema);