import { useState } from "react"
function Todo()
{
    const [Task,setTask] = useState([]);
    const [newTask,setNewTask] = useState("");//for handleInputChange

    //when type something in text box show it realtime
    function handleInputChange(event){
      setNewTask(event.target.value)  
    }
    function addTask(){
       if(newTask.trim() !== "") //trim() remove any white space
       {
              setTask(Task => [...Task,newTask]);// ...Task This uses the spread operator to copy all existing tasks in the current list.
       //Why do we need to “copy all tasks” when adding a new task?
          //State (Task) should never be modified directly.
          //Instead, you create a new array based on the old one plus your new item, then update the state with it.
       setNewTask("");//clear after add
       }
       else{
          alert('Can not be enter blanck..!');
       }
    }
    function deleteTask(Index){
       const updatedTask = Task.filter((event,index) => index !== Index);
       /* .filter() is an array method that:
            1. Loops through each element
             2 .Provides the element and its index.
             3.Returns a new array with only the elements where the condition is tru 
               index = filter function index
               Index = parmeter
             */
       setTask(updatedTask);
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
            <h1>TO-DO App</h1>
            <input type="text" placeholder="Enter task..." value={newTask} onChange={handleInputChange}/>
            <button onClick={addTask}>ADD</button>

            <div>
              {/* .map() loops over each item in the Task array.*/}  
               {Task.map((task,Index) =>
                  <li key={Index}>
                    <span>{task}</span>
                    <button onClick={()=> deleteTask(Index)}>DELETE</button>
                    <button onClick={() =>moveUpTask(Index)}>👆</button>
                    <button onClick={() =>moveDowmTask(Index)}>👇</button>
                    {/* Here, deleteTask is a function reference.this is not call immediately this work only when you click button*/}
                    {/*onClick = {deleteTask(Index)}  this is immediate.its work even without clicking button.here we are calling to function not function refference*/}
                    {/* onClick={() =>moveDowmTask(Index)}  using arrow function we can easily prevent problem */}
                  </li>
                )}

             
            </div>
        </div>
    )
}
export default Todo