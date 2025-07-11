import {useNavigate} from 'react-Router-dom'
import './Navigation.css'

function Navigation(){
    const navigate = useNavigate()
    return(
      <div className='NavContainer'>
        <div className='element' onClick={() => navigate("/Todo")}>Home</div>
        <div className='element' onClick={() => navigate("/About")}>About US</div>
        <div className='element' onClick={() => navigate("/")}>Create account</div>
      </div>
    )
}
export default Navigation