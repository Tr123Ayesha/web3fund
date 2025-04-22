import React from 'react';
import PersistentDrawerLeft from './components/sidebar/index';
import Dashboard from './pages/dashboard';
import Referral from './pages/referrals';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"; // Import Outlet and BrowserRouter
import MainLive from './pages/LiveVideo/MainLive';
import ConnectWallet from "./pages/connectWallet/connectwallet";
import SendMoney from './pages/SendMoney';
const DashboardLayout = () => (
  <>
    <PersistentDrawerLeft showSidebar={true} style={{ overflowX: "hidden" }}>
      <Outlet /> {/* Nested routes will render here */}
    </PersistentDrawerLeft>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout route that wraps child routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />  {/* Default route */}
          <Route path="referrals" element={<Referral />} />
            {/* Child route */}
        </Route>
        {/* Optional: Redirect any unknown path to home */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/MainLive" element={<MainLive />}/>
        <Route path='/connectWallet' element={<ConnectWallet />} /> 
        <Route path='/sendmoney' element={<SendMoney />} />
       
      </Routes>
    </Router>

  );
}

export default App;
