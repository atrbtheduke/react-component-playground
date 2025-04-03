import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./features/navigation/Navbar";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Home from "./features/pages/Home";
import About from "./features/pages/About";
import Services from "./features/pages/Services";
import Contact from "./features/pages/Contact";
import TodosPage from "./features/todos/pages/TodosPage"; 
import AccordionPage from './features/accordion/pages/AccordionPage';

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<TodosPage />} /> 
          <Route path="/faq" element={<AccordionPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;