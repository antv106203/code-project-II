import logo from '../../../image/logo_library.png';
import './AdminNavbar.css'
import { NavLink } from 'react-router-dom';

const AdminNavbar = () =>{
    return(
        
    <nav class="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
        <div class="container-fluid">
            <NavLink className="navbar-brand" to="/">Trang chủ</NavLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button> 
        </div>
    </nav>
        
    )
};

export default AdminNavbar;