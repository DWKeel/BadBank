import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar';
import Home from './components/home/home';
import Contact from './components/home/contact';
import Login from './components/Auth/login';
import CreateAccount from './components/Auth/createAccount';
import Dashboard from './components/transactions/dashboard';
import Deposit from './components/transactions/deposit';
import Withdraw from './components/transactions/withdraw';
import RequireAuth from './components/Auth/requireAuth';
import { AuthProvider } from './contexts/auth/authContext';
import { AuthStateChanged } from './components/Auth/authStateChanged';


function App() {
  
  return (
    <Router>
        <AuthProvider>
          <AuthStateChanged>
          <NavBar />
          <div className='container' style={{ padding: '20px' }}>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/CreateAccount/' element={<CreateAccount />} />
              <Route path='/login/' element={<Login />} />
              <Route path='*' exact element={<h4>Page Not Found</h4>} />
              <Route path='/contact/' element={<Contact />} />

              <Route element={<RequireAuth />}>
                <Route path='/dashboard/' element={<Dashboard />} />
                <Route path='/deposit/' element={<Deposit />} />
                <Route path='/withdraw/' element={<Withdraw />} />
              </Route>

            </Routes>
          </div>
          </AuthStateChanged>
        </AuthProvider>
    </Router>
  );
}

export default App;