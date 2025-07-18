import {useNavigate} from 'react-Router-dom'
import './Navigation.css'

function Navigation(){
    const navigate = useNavigate()
    return(
      <div className='NavContainer'>
        <div className='element' onClick={() => navigate("/Todo")}>Home</div>
        <div className='element' onClick={() => navigate("/About")}>About US</div>
        <div className='element' onClick={() => {localStorage.removeItem('token'),navigate("/"),window.location.reload();}}>Logout</div>
        {/*  window.location.reload(); - force React to re-check auth states if needed */} 
      </div>
    )
}
export default Navigation