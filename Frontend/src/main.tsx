import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MaqasidThemeProvider from "./styling/MaqasidThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MaqasidThemeProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MaqasidThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
