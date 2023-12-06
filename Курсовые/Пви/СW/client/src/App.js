import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import RegisterPage from './components/Pages/RegisterPage';
import LoginPage from './components/Pages/LoginPag';
import React, { useEffect } from 'react';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteWrapper><MainPage /></RouteWrapper>} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/signin" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

function RouteWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthentication().then((Authenticated) => {
      setIsAuthenticated(Authenticated);
      setIsLoading(false);

    });
  
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}

async function checkAuthentication() {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
   const response = await fetch('http://localhost:3001/api/check-token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status !== 200) {
      console.log('Token verification failed');
      return false;
    }

    const data = await response.json();
    console.log(data);
    return data.isValid;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default App;
