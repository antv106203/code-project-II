import { useState } from 'react';
import './Login.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth_Context';
import {useNavigate, Link} from 'react-router-dom'
import { useEffect } from 'react';


const Login = () =>{

    const {listSach, listTheLoaiSach} = useContext(AuthContext); 
    console.log(listSach);
    console.log(listTheLoaiSach);
    const [input, setInput] = useState({
        tendangnhap: "",
        matkhau: "",
    });

    const [,setError] = useState(null);

    const {login} = useContext(AuthContext);
    const {currentUser} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setInput((prevInput) =>({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));

        console.log(input);
    };

    console.log(currentUser);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        if(!input.tendangnhap || !input.matkhau){
            setError("Vui lòng nhập tên đăng nhập và mật khẩu");
            console.log("loi");
            alert("vui log nhap tai khoan va mat khau");
            return;
        }
         else{
            try {
            await login(input);
            if(currentUser.vaitro === 'admin'){
                navigate("/account");
            }
            else if (currentUser.vaitro === 'user'){
                navigate("/user");
            }

            else if(currentUser.vaitro === 'staff'){
                navigate("/staff");
            }
            else if(currentUser.vaitro === 'manager'){
                navigate('/manager');
            }
        } catch (error) {
            //alert("sai tai khoan hoac mat khau");
            setError("Loi khi dang nhap")
        }
    }
    }
    //localStorage.removeItem('user');
    
    // useEffect(() => {
    //     // Xoá hết localStorage
    //     localStorage.clear();
    // }, []);
    console.log(localStorage);
    return(
        <div className='login'>
            <div className='kc'>
                <form className='form-login' style={{width: '400px', height:'450px'}}>
                    <h1>Đăng Nhập</h1>
                    
                        <div className="form-field">
                            <i className='fas fa-user'></i>
                            <input type='text' name='tendangnhap' onChange={handleChange} required placeholder='Tên đăng nhập'/>
                            
                        </div>

                        <div className="form-field">
                            <i className='fas fa-lock'></i>
                            <input type='password' name='matkhau' onChange={handleChange} required placeholder='Mật khẩu'/>
                            
                        </div>

                        
                        <button onClick={handleSubmit}> Đăng nhập </button>
                </form>
            </div>
        </div>
           
    );
};

export default Login;