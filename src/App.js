import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from "./context/Notes/NoteState";
import About from "./controllers/About";
import Home from "./controllers/Home"
import Navbar from "./controllers/Navbar";
import Login from "./controllers/Login"
import SignUp from "./controllers/SignUp"
import Alert from "./controllers/Alert"
import { useState } from "react";


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert= (type, message)=>{
    setAlert({
      message:message,
      type:type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
    
  }
  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route exact path="/about" element={<About showAlert={showAlert}/>}> </Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}> </Route>
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}> </Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
