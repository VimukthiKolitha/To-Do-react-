import { useState } from "react"
import {useNavigate} from 'react-Router-dom'
import Navigation from "./Navigation";
import axios from 'axios'
function Login() {

    const [typeEmail,setTypeEmail] = useState("");
    const [typePass,setTypePass] = useState("");
    const [isLogin,setIsLogin] = useState(true);
    const navigate = useNavigate();

    function onTypeEmail(event){
        setTypeEmail(event.target.value)
    }
    function onTypePass(event){
        setTypePass(event.target.value)
    }
     async function Login(){
      try {
        const response = await axios.post('http://localhost:4000/Login',{Email:typeEmail,Password:typePass})
        alert(response.data.message);
         setTypeEmail('');
         setTypePass('');
         navigate('/Todo');
      } catch (error) {
         alert(error.response.data.error);
      }
    }

   async function createAccount(){
       try {
        const response = await axios.post('http://localhost:4000/createAccount',{Email:typeEmail,Password: typePass})
        alert(response.data.message);
        setTypeEmail('');
        setTypePass('');
        setIsLogin(true)

       } catch (error) {
         alert(error.response.data.error);
       }
    }

    return(
        <div>
            <Navigation/>
          { isLogin ?(
            <div>
            <h1>Login</h1>
             <input type="email" value={typeEmail} placeholder="Entert Email" onChange={onTypeEmail}/><br/>
             <input type="password" value={typePass} placeholder="Enter password" onChange={onTypePass}/><br/>
             <button onClick={Login}>Login</button><br/>
             <p>Don't have an account?<span  style={{ color: "blue", cursor: "pointer" }} onClick={()=> setIsLogin(false)}>Create account</span></p>
          </div>
        ) : ( 
           <div>
            <h1>Create account</h1>
             <input type="email" value={typeEmail} placeholder="Entert Email" onChange={onTypeEmail}/><br/>
             <input type="password" value={typePass} placeholder="Enter password" onChange={onTypePass}/><br/>
             <button onClick={createAccount}>Create Account</button><br/>
             <p>Already have an account?<span style={{ color: "blue", cursor: "pointer" }} onClick={()=> setIsLogin(true)}>Sign in</span></p>
          </div>
          )}
        </div>
    )
}
export default Login