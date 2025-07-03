import {BrowserRouter,Route,Routes} from 'react-Router-dom'
import Login from './Login'
import Todo from './Todo'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Login/>}/>
      <Route path='/Todo' element ={<Todo/>} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App

