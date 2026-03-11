import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import Register from "./pages/LoginForm";


function App() {
  return (
    <Router>
      <div style={{ background: "#F8F9FA", minHeight: "100vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<div>LoginForm</div> } />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;