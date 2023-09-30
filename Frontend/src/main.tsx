import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MaqasidThemeProvider from "./styling/MaqasidThemeProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MaqasidThemeProvider>
            <App/>
        </MaqasidThemeProvider>
    </React.StrictMode>,
)
