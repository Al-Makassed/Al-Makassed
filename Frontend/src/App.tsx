import {FC} from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Login from "./Pages/Login";
import Header from "./Pages/Header";


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

export default App;
