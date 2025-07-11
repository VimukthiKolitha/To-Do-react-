import { useState } from "react"
import Navigation from "./Navigation";
import axios from "axios";
import { useEffect } from "react";
import './Todo.css';
function Todo()
{
    const [Task,setTask] = useState([]);
    const [newTask,setNewTask] = useState("");//for handleInputChange
    useEffect(()=>{
     Display();
    },[]);


    //when type something in text box show it realtime
    function handleInputChange(event){
      setNewTask(event.target.value)  
    }
    async function addTask(){
       try {
        if(newTask.trim() !== "") //trim() remove any white space
       {
         const responce = await axios.post('http://localhost:4000/Task',{Todo:newTask});
         setNewTask("");
         alert(responce.data.message);
       }
       else{
       }
       } catch (error) {
         alert(error.responce.data.error);
       }
    }
    async function Display()
    {
       try {
        const responce = await axios.get('http://localhost:4000/display');
        setTask(responce.data.list);
       } catch (error) {
        alert(error.responce.data.error);
       }

    }
    async function deleteTask(ID){
       try {
        const response = await axios.delete(`http://localhost:4000/Task-delete/${ID}`);
        alert( response.data.message)
        Display();
       } catch (error) {
        alert(error.response.data.error)
       }
    }
    function moveUpTask(Index){
      
      if(Index > 0)
      {
         const updatedTask = [...Task];//get all task 
         [updatedTask[Index],updatedTask[Index - 1]] = [updatedTask[Index - 1],updatedTask[Index]];
         setTask(updatedTask);
      }
    }
    function moveDowmTask(Index){
        if(Index < Task.length - 1)
        {
          const updatedtask = [...Task];
          [updatedtask[Index],updatedtask[Index + 1]] = [updatedtask[Index + 1],updatedtask[Index]];
          setTask(updatedtask)
        }
    }

    return(
        <div>
         <div className="nav"> <Navigation/></div>
         <div className="page-content">
           <div>
            <div className="fixed-input">
                <input className="WriteTask" type="text" placeholder="Enter task..." value={newTask} onChange={handleInputChange}/>
                <button className="add" onClick={addTask}>ADD</button>
            </div>
           

            <div className="todo">
              {/* .map() loops over each item in the Task array.*/}  
               {Task.map((task,Index) =>
                  <li key={Index}>
                    <span className="display">{task.Todo}</span>{/*This accesses the Todo field inside your MongoDB document.*/}
                    <button className="action-delete" onClick={()=> deleteTask(task._id)}>DELETE</button>
                    <button className="action-up" onClick={() =>moveUpTask(Index)}>⬆️</button>
                    <button className="action-down" onClick={() =>moveDowmTask(Index)}>⬇️</button>
                    {/* Here, deleteTask is a function reference.this is not call immediately this work only when you click button*/}
                    {/*onClick = {deleteTask(Index)}  this is immediate.its work even without clicking button.here we are calling to function not function refference*/}
                    {/* onClick={() =>moveDowmTask(Index)}  using arrow function we can easily prevent problem */}
                  </li>
                )}
            </div>
           </div>
           
         </div>
           
        </div>
    )
}
export default Todo