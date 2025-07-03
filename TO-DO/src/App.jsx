import {BrowserRouter,Route,Routes} from 'react-Router-dom'
import Login from './Login'
import Todo from './Todo'
import About from './About'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Login/>}/>
      <Route path='/Todo' element ={<Todo/>} />
      <Route path='/About' element={<About/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App

