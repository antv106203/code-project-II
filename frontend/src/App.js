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
import TrangChuStaff from './Pages/StaffPage/TrangChuStaff';
import ChiTietSach from './Pages/StaffPage/ChiTietSach';
import TrangChuManager from './Pages/ManagerPage/TrangChuManager';
import ChiTietSach_manager from './Pages/ManagerPage/ChiTietSach_manager';







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
        <Route path="/staff"  exact element={<TrangChuStaff/>} />
        <Route path="/staff/chitietSach"  exact element={<ChiTietSach/>} />
        <Route path="/manager"  exact element={<TrangChuManager/>} />
        <Route path="/manager/chitietSach"  exact element={<ChiTietSach_manager/>} />
      </Routes>

      
    </Router>
  );
}

export default App;
