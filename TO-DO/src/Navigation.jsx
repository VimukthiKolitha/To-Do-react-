import {useNavigate} from 'react-Router-dom'
function Navigation(){
    const navigate = useNavigate()
    return(
      <div>
        <div><span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/About")}>About US</span></div>
        <div><span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/Todo")}>Home</span></div>
        <div><span  style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/")}>Create account</span></div>
      </div>
    )
}
export default Navigation