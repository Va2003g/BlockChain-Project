import React from "react";
import { render } from "react-dom";
// import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Comments from "./components/Comments";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">

          <Routes>
            <Route key="Register" path='/' exact element={<Register></Register>} />
            <Route  key="login"path='/login' exact element={<Login></Login>}></Route>
            <Route key="comment"path='/comments' exact element={<Comments></Comments>}> </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
};

render(<App />, document.getElementById("app"));