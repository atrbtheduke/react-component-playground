// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Login from "./features/auth/Login";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route exact path="login" element={<Login />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

// the new app.jsx file

import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./features/navigation/Navbar"
import Login from "./features/auth/Login"
import Home from "./features/pages/Home"
import About from "./features/pages/About"
import Services from "./features/pages/Services"
import Contact from "./features/pages/Contact"

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App


