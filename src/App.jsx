import SingIn from "./Auth/component/Login";
import Singup from "./Auth/component/Register";

//  import Home from './component/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Edit from "./component/Edit";
  import 'react-toastify/dist/ReactToastify.css';

// import Progress from "./component/Progress";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SingIn />} />
          <Route exact path="/home" element={<Home />} />
          {/* <Route exact path="/progress" element={<Progress />} /> */}
          <Route exact path="/register" element={<Singup />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
    </ChakraProvider>
  );
}

export default App;
