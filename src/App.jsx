import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <About />
    </div>
  );
}

export default App;
