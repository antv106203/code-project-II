import logo from './logo.svg';
import './App.css';
import Login from './Pages/Register_Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";

import Navbar from './Components/navbar/Navbar';
import Account from './Pages/Account/Account';
import Dashboard from './Components/Dashboard';
import Them from './Pages/Account/ThemTaiKhoan';
import Footer from './Components/Footer/Footer';
import HeaderUser from './Pages/UserPage/Header/TrangChuUser';
import DetailSach from './Pages/UserPage/DetailSach';
import TaiKhoan from './Pages/UserPage/Header/TaiKhoan';






function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/dashboard"  exact element={<Dashboard />} />
        <Route path="/account"   exact element={<Account/>} />
        <Route path="/account/Them"  exact element={<Them />} />
        <Route path="/user"  exact element={<HeaderUser/>} />
        <Route path="/user/detailsach"  exact element={<DetailSach />} />
        <Route path="/user/taikhoan"  exact element={<TaiKhoan/>} />   
      </Routes>

      
    </Router>
  );
}

export default App;
