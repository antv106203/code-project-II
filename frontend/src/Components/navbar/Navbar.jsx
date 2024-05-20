import React , { useEffect, useContext, useRef } from 'react'
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/auth_Context';
import Library from '../../image/stack-of-books.png';
import { NavLink } from 'react-router-dom';
import img_role from '../../image/icon_role.png';
import img_login from '../../image/login2.png';


const Navbar = () =>{
    const { currentUser, logout } = useContext(AuthContext);
    const itemRef = useRef(null)  
    const navigate = useNavigate();
    //useEffect(() => {itemRef.current.click()}, [currentUser])
    const shouldClickRef = useRef(false);
    useEffect(() => {
        if (shouldClickRef.current && itemRef.current) {
          itemRef.current.click();
          shouldClickRef.current = false;
        }
      }, [currentUser]);

      const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to "/" after logout
      };

    
    //console.log(currentUser.vaitro);
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
            <div class="container-fluid">
                <NavLink className="navbar-brand navbar-logo" to="/" exact="true">
                    <img src={Library} alt='' style={{ width: '50px', height: '50px' , marginLeft: '20px'}}/>
                </NavLink>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ml-auto" style={{width: '100%'}}>
                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>

                        

                        <li className="nav-item active" ref={itemRef}>
                            <NavLink className="nav-link" to="/dashboard" exact="true" style={{fontFamily: 'sans-serif'}}>
                                <div className='nav-item' style={{marginTop: '17px'}}>DASHBOARD</div>
                            </NavLink> 
                        </li>

                        { currentUser?.vaitro === "admin" ?
                            <NavLink className="nav-link" to="/account" exact="true" style={{fontFamily: 'sans-serif'}}>
                                <div className='nav-item' style={{marginTop: '17px'}}>ACCOUNTS</div>
                            </NavLink> 
                        : null }

                        <span style={{width: '50%', 
                        
                            marginRight: !currentUser ? '-150px' : 
                            currentUser?.vaitro === "admin" ? '-200px' :
                            currentUser?.vaitro === "user" ? '-250px' : 
                            currentUser?.vaitro === "manager" || currentUser?.vaitro === "staff" ? '-250px' : '-400px' }}>
                        </span>

                        <NavLink className="nav-link" to='/info' 
                        style={{marginLeft:'300px'}}         
                                 
                                 
                        >
                            <img src={img_role} alt='' style={{ width: '60px', height: '60px' , marginLeft: '20px'}}/>

                            {currentUser ? currentUser.vaitro : 'Khách'}
                        </NavLink>
      
                        {  currentUser ?
                          <NavLink onClick={handleLogout} className="nav-link" to='/' >
                            <div nav-item>
                            <img src={img_role} alt='' style={{ width: '60px', height: '60px' , marginLeft: '20px'}}/>
                            Đăng Xuất
                            </div>
                          </NavLink> 
                          :
                          <NavLink className="nav-link" to='/login' >

                            <div nav-item>
                            <img src={img_role} alt='' style={{ width: '60px', height: '60px' , marginLeft: '20px'}}/>
                            Đăng Nhập
                            </div>
                          </NavLink>
                          }

                        
                        

                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;