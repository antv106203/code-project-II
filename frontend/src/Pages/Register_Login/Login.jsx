import { useState } from 'react';
import './CSS/Login.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/auth_Context';
import {useNavigate, Link} from 'react-router-dom'


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
            console.log("loi")
            return;
        }
        try {
            await login(input);
            if(currentUser.vaitro === 'admin'){
                navigate("/account");
            }
            else if (currentUser.vaitro === 'user'){
                navigate("/user");
            }
        } catch (error) {
            setError("Đã xảy ra lỗi khi đăng nhập");
        }
    }

    

    return(
        <div className='login'>
            <div className="center">
                <h1>Đăng Nhập</h1>
                <form>
                    <div className="txt_field">
                        <input type='text' name='tendangnhap' onChange={handleChange} required/>
                        <label>Tên Đăng Nhập</label>
                    </div>

                    <div className="txt_field">
                        <input type='password' name='matkhau' onChange={handleChange} required/>
                        <label>Mật Khẩu</label>
                    </div>

                    <div className="pass">Quên mật khẩu?</div>
                    <input type='submit' value="Đăng Nhập" onClick={handleSubmit}/>
                </form>
            </div>
        </div>
           
    );
};

export default Login;