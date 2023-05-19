import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import ProfilePage from './pages/ProfilePage';

import './App.css'
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import NewsPage from './pages/News/NewsPage';

function App() {
  // Simulated login state
  const isLoggedIn = false; // Replace with your actual login logic

  const isAuthinticated = useIsAuthenticated();

  return (
      <Layout>
        <Routes>
          {/* <Route exact path="/" element={<LandingPage/>} /> */}
          <Route exact path="/" element={<NewsPage/>} />

          {/* Restricted routes for guests */}
          {!isAuthinticated() && (
            <>
              <Route exact path="/login" element={<LoginPage/>} />
              <Route exact path="/register" element={<RegisterPage/>} />
            </>
          )}

          {/* Routes for logged-in users */}
          <Route exact path="/profile" element={<RequireAuth loginPath='/login'>
            <ProfilePage/>
          </RequireAuth>} />

          {/* Navigate all other routes to the appropriate pages */}
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Layout>
  );
};

export default App;
