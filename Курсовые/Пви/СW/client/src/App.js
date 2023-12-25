import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import RegisterPage from './components/Pages/RegisterPage';
import LoginPage from './components/Pages/LoginPag';
import AdminPage from './components/Pages/AdminLoginPage';
import AdminPanel from './components/Pages/AdminPanel';
import ProjectsPage from './components/Pages/ProjectsPage';
import TeamsPage from './components/Pages/TeamsPage';
import TaskPage from './components/Pages/TaskPage';
import StatPage from './components/Pages/StatPage';
import React, { useEffect } from 'react';
import { useState } from 'react';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteWrapper  allowedRoles={['user']}><MainPage /></RouteWrapper>} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/signin" element={<LoginPage />}/>
        <Route path="/admin" element={<AdminPage  />}/>
        <Route path="/adminpanel" element={<RouteWrapper  allowedRoles={['admin']}><AdminPanel /></RouteWrapper>} />
        <Route path="/projects" element={<RouteWrapper  allowedRoles={['user']}><ProjectsPage /></RouteWrapper>} />
        <Route path="/teams" element={<RouteWrapper  allowedRoles={['user']}><TeamsPage /></RouteWrapper>} />
        <Route path="/task" element={<RouteWrapper  allowedRoles={['user']}><TaskPage /></RouteWrapper>} />
        <Route path="/stat" element={<RouteWrapper  allowedRoles={['user']}><StatPage /></RouteWrapper>} />
      </Routes>
    </BrowserRouter>
  );
}
function RouteWrapper({ children, allowedRoles }) {
  const [isLoading, setIsLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthentication(allowedRoles).then((Authenticated) => {
      setIsAuthenticated(Authenticated);
      setIsLoading(false);});
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  } return children;
}
const API_URL = process.env.REACT_APP_SERVER_URL;
async function checkAuthentication(rols) {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  try {
    const response = await fetch(`${API_URL}/api/check-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      console.log('Token verification failed');
      return false;
    }
    const data = await response.json();
    if (data.roles && data.roles.some(val => rols.includes(val))) {
      return data.isValid;
    } else {
      alert('Недостаточно прав');
      return false;
    }
  } catch (err) {
    return false;
  }
}
export default App;