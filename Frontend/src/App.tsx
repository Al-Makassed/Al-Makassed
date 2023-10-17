<<<<<<< HEAD
import {FC} from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Login from "./Pages/Login";
// import Header from "./Pages/Policies/Components";

const App: FC = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/> */}
                    <Route path="/" element={<Header/>}/>

                </Routes>
            </Router>
        </div>
    );
                  };
=======
import React, { lazy, Suspense, FC } from "react";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

import { Routes, Route } from "react-router-dom";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
>>>>>>> 5832548c207134173650a834e40dd49f169d0ea7
};

export default App;
