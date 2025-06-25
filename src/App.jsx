import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<CollectionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
