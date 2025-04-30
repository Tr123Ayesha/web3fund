import React from 'react';
import PersistentDrawerLeft from './components/sidebar/index';
import Dashboard from './pages/dashboard';
import Referral from './pages/referrals';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"; // Import Outlet and BrowserRouter
import MainLive from './pages/LiveVideo/MainLive';
import ConnectWallet from "./pages/connectWallet/connectwallet";
import SendMoney from './pages/SendMoney';
import { ThemeProvider } from './context/ThemeContext';
import ThreeDComponent from "./pages/three/three.js";
import ScrollAnimation from "./pages/scrollAnimation.js";
import LoginFormAnimation from "./pages/loginFormAnimation/animationLogin.js";
const DashboardLayout = () => (
  <>
    <PersistentDrawerLeft showSidebar={true} style={{ overflowX: "hidden" }}>
      <Outlet /> {/* Nested routes will render here */}
    </PersistentDrawerLeft>
  </>
);

function App() {
  return (
    //theme provider is used for Dark and Light mode
    <ThemeProvider>
    <Router>
      <Routes>
        {/* Dashboard Layout route that wraps child routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="referrals" element={<Referral />} />
            {/* Child route */}
        </Route>
        {/* Optional: Redirect any unknown path to home */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/MainLive" element={<MainLive />}/>
        {/* connect Wallet is Basically BlockChain Integration with a usdt Token */}
        <Route path='/connectWallet' element={<ConnectWallet />} /> 
        <Route path='/sendmoney' element={<SendMoney />} />
        {/*this Route is for Animation and using Three.js that is animation Library */}
       <Route path="/three" element={<ThreeDComponent />} />
       {/*this Route is for a dummy 3d model animation*/}
       <Route path="/3DModal" element={<ScrollAnimation />} />
         {/*this Route is for login animation*/}
         <Route path="/LoginAnimation" element={<LoginFormAnimation />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
