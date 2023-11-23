import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/one" element={<MainPage />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;