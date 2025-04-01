import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
