import mongoose from 'mongoose'

const TasksSchema = new mongoose.Schema({
    Todo:{type:String,required:true}
})
export default mongoose.model('Tasks',TasksSchema);