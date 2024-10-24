import React from 'react';
import PersistentDrawerLeft from './components/sidebar/index';
import Dashboard from './pages/dashboard';
import Referral from './pages/referrals';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"; // Import Outlet and BrowserRouter
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
      </Routes>
    </Router>

  );
}

export default App;
