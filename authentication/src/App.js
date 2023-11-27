
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ShowData from './Components/ShowData';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <>
     <Navbar/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/usersData" element={<ShowData />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
