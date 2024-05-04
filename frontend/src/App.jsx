import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* If no route matches the current URL, render a default view */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default App;
