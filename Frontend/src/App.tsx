import { FC } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Login";
import Index from "./Pages/Sidebar/index";
const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
