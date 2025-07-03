import { useState } from "react"
import {useNavigate} from 'react-Router-dom'
import Navigation from "./Navigation";
function Login() {

    const [typeEmail,setTypeEmail] = useState("");
    const [typePass,setTypePass] = useState("");
    const [Email,setEmail] = useState(["vimukthi@gmail.com"]);
    const [Pass,setPass] = useState(["1234"]);
    const [isLogin,setIsLogin] = useState(true);
    const navigate = useNavigate();

    function onTypeEmail(event){
        setTypeEmail(event.target.value)
    }
    function onTypePass(event){
        setTypePass(event.target.value)
    }
    function Login(){
        // Check if email exists in Email array
       const valEmail = Email.includes(typeEmail);

        // Check if password exists in Pass array
       const valPass = Pass.includes(typePass);

       if(valEmail && valPass)
       {
         alert('login sucess...!');
         navigate('/Todo');
       }
       else{
        alert('Check email again');
       }

    }

    function createAccount(){
    setEmail ([...Email,typeEmail]);
    setPass ([...Pass,typePass]);
    alert('success...!')
    setTypeEmail("");
    setTypePass("");
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