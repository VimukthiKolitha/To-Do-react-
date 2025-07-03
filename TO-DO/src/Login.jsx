import { useState } from "react"
import {useNavigate} from 'react-Router-dom'
function Login() {

    const [typeEmail,setTypeEmail] = useState("");
    const [typePass,setTypePass] = useState("");
    const [Email,setEmail] = useState(["vimukthi@gmail.com"]);
    const [Pass,setPass] = useState(["1234"]);
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

    return(
        <div>
          <div>
             <input type="email" value={typeEmail} placeholder="Entert Email" onChange={onTypeEmail}/><br/>
             <input type="password" value={typePass} placeholder="Enter password" onChange={onTypePass}/>
             <button onClick={Login}>Login</button>
          </div>
        </div>
    )
}
export default Login