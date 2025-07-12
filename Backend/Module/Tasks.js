import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema({
    work:{type:String,required:true},
    action:{type:Boolean,default:true}
})
export default mongoose.model('Tasks',TasksSchema);