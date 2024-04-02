import SingIn from './Auth/component/Login'
//  import Singup from './Auth/component/Register'
//  import Myhedaer  from './component/nav/MyHeader';
// import Home from './component/Home'
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';


function App() {

  return (
    <>
     <Router>
            <Routes>
              <Route exact path="/" element={<SingIn/>}/>
              <Route exact path="/home" element={<Home/>}/>
              {/* <Route exact path="/edit/:id" element={<Edit/>}/>  */}
            </Routes>
        </Router>
        {/* <Myhedaer /> */}
    {/* <Singup /> */}
    </>
  )
}

export default App
