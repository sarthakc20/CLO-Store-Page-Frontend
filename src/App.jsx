import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollectionPage from './pages/CollectionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
