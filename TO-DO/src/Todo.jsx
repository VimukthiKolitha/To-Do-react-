import { useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import { useEffect } from "react";
import deleteico from "./assets/delete.png";
import edit from "./assets/edit.png";
import './Todo.css';


function Todo()
{
  //use states
    const [Task,setTask] = useState([]);
    const [newTask,setNewTask] = useState("");//for handleInputChange
    const [inputsearch,setSearch] = useState("");
    const [update,setUpdate] = useState(true)//change ui when click edit
    const [updated,setUpdated] =useState("")
    const [editId,setEditId] = useState("")


    //use effect to diplsy all todos
    useEffect(()=>{
     Display();
    },[]);


    //when type something in text box show it realtime
    function handleInputChange(event){
      setNewTask(event.target.value)  
    }


    //add a todo
    async function addTask(){
       try {
        if(newTask.trim() !== "") //trim() remove any white space
       {
       
        const token = localStorage.getItem('token')
       console.log("Token from localStorage:", token);

        const response = await axios.post(`http://localhost:4000/Task`,{work:newTask},{headers:{Authorization:`Bearer ${token}`}}); //work mean db schema

         alert(response.data.message);
         setNewTask("");
         Display();
       }
       } catch (error) {
         alert(error.response.data.error);
       }
    }
    
    //display all todos
    async function Display()
    {
       try {
         const token =  localStorage.getItem('token')
         
         const response = await axios.get(`http://localhost:4000/display`,{headers:{Authorization:`Bearer ${token}`}});

        setTask(response.data.list);
       } catch (error) {
        alert(error.response.data.error);
       }

    }

    //delete a todo
    async function deleteTask(ID){
       try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:4000/Task-delete/${ID}`,{headers:{Authorization:`Bearer ${token}`}});
       
        alert(response.data.message)
        Display();
       } catch (error) {
        alert(error.response.data.error)
       }
    }

    //move task up
    function moveUpTask(Index){
      
      if(Index > 0)
      {
         const updatedTask = [...Task];//get all task 
         [updatedTask[Index],updatedTask[Index - 1]] = [updatedTask[Index - 1],updatedTask[Index]];
         setTask(updatedTask);
      }
    }

    //move task down
    function moveDowmTask(Index){
        if(Index < Task.length - 1)
        {
          const updatedtask = [...Task];
          [updatedtask[Index],updatedtask[Index + 1]] = [updatedtask[Index + 1],updatedtask[Index]];
          setTask(updatedtask)
        }
    }
    
   //change status of a todo
    async function ActionComplete(ID,newAction){
      try {
        const token = localStorage.getItem('token');
        const responce = await axios.post(`http://localhost:4000/Action/${ID}`,{action:newAction},{headers:{Authorization:`Bearer ${token}`}}) /*action mean Db schema */
        alert(responce.data.message)
        Display();
      } catch (error) {
        alert(error.responce.error)
      }
    }

    //search function
     async function search(event){
       setSearch(event.target.value);
    }

    //update function
    async function Edit() {

      const token = localStorage.getItem('token');
      const responce = await axios.post(`http://localhost:4000/edit/${editId}`,{work:updated},{headers:{Authorization:`Bearer ${token}`}})
      try {
        
        alert(responce.data.message);
        setUpdate(true);
        Display();
        setEditId("");
        setUpdated("")
        

      } catch (error) {
        alert(error.responce.data.error);
      }
    }

    //updated input
    function updatedIndex(event){
      setUpdated(event.target.value)
    }


    return(
        <div>
         <div className="nav"> <Navigation/></div>
         <div className="page-content">
          {update?(
            <div>
            <div className="fixed-input">
                <input className="WriteTask" type="text" placeholder="Enter task..." value={newTask} onChange={handleInputChange}/>
                <button className="add" onClick={addTask}>ADD</button>
            </div>
           
              <input type="text" className="searchbar" placeholder="🔍" value={inputsearch} onChange={search}/>
              
            <div className="todo">
                {/* task.work → The text of your task (e.g., "Buy vegetables").
                   .toLowerCase() → Makes the text lowercase for case-insensitive searching.
                   .includes(inputsearch.toLowerCase()) → Checks if the current task’s work contains the user's search text (inputsearch).*/}
               {Task.filter(task =>task.work.toLowerCase().includes(inputsearch.toLocaleLowerCase()))
               /* .map() loops over each item in the Task array.*/
               .map((task,Index) =>
                  <li key={Index}>
                    <span className="display">{task.work}</span>{/*This accesses the Todo field inside your MongoDB document.*/}
                    
                    <button className="editbtn" onClick={()=>{setUpdate(false),setEditId(task._id),setUpdated(task.work)}}><img className="editbtnicon" src={edit}  alt="edit"/></button>

                    <button className="action-delete" onClick={()=> deleteTask(task._id)} ><img src={deleteico} alt="delete" className="deleteico"/></button>

                    <button className="action-up" onClick={() =>moveUpTask(Index)}>⬆️</button>

                    <button className="action-down" onClick={() =>moveDowmTask(Index)}>⬇️</button>
                    <div>
                      {task.action?(
                       <button className="action-down" onClick={() =>ActionComplete(task._id,false)}>⛔ todo</button>
                      ):(
                       <button className="action-down" onClick={() =>ActionComplete(task._id,true)}>✅ done</button>
                      )  
                    }
                    </div>
                    {/* Here, deleteTask is a function reference.this is not call immediately this work only when you click button*/}
                    {/*onClick = {deleteTask(Index)}  this is immediate.its work even without clicking button.here we are calling to function not function refference*/}
                    {/* onClick={() =>moveDowmTask(Index)}  using arrow function we can easily prevent problem */}
                  </li>
                )}
            </div>
           </div>
          ):(
                <div>
                  <h1>Edit</h1>
                <div className="form">
                  <input type="text" className="updateinput" onChange={updatedIndex} value={updated}/>
                  <button className="save" onClick={Edit}>Save</button>
                </div>
                </div>
          )}  
           
           
         </div>
           
        </div>
    )
}
export default Todo