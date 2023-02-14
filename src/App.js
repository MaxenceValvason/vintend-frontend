import "./App.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import Publish from "./pages/Publish";
import Payement from "./pages/Payement";
//components
import Header from "./components/Header";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <Router>
        <Header setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payement" element={<Payement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
