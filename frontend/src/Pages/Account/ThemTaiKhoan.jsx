import { useState } from "react";
import React from "react";
import '../CSS/ThemTaiKhoan.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ThemTaiKhoan = () =>{

    const hanldeOnClick = async() =>{
        const res =  await axios.post("http://localhost:4000/api/users",information)
        if(res.data === "Thành công"){
            alert("đăng kí tài khoản thành công");
            navigate("/account");
        }
        else{
            console.log("that bai")
        }
    }
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setInformation((prevInput) =>({
            ...prevInput,
            [e.target.name]: e.target.value,
            chucvu: prevInput.vaitro === 'admin' ? 'Nhân viên hệ thống' : prevInput.chucvu,
        }));


        //console.log(input);
    };
    
    const startDate = new Date();
    var a = startDate.getMonth() + 1;
    var b = startDate.getFullYear() + 1;
    const year = startDate.getFullYear().toString();
    const nextyear = b.toString();
    const month = a.toString().padStart(2, '0');
    const day = startDate.getDate().toString().padStart(2, '0');
    const ngaycap = `${year}-${month}-${day}`;
    const ngayhethan = `${nextyear}-${month}-${day}`;
    const [information, setInformation] = useState({
        tendangnhap: '',
        matkhau: '',
        hovaten: '',
        vaitro: '',
        chucvu: '',
        ngaysinh: '',
        socccd: null,
        sodienthoai: '',
        gioitinh: '',
        email: '',
        diachi: '',
        quequan: '',
        ngaycap: ngaycap,
        ngayhethan: ngayhethan,
    })
    console.log(information);
    
    return (
        <div className="themtaikhoan-container">
            <div className="form-container">
                <h1>Đăng ký tài khoản mới</h1>
                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Tên Đăng Nhập"
                        name="tendangnhap"
                        onChange={handleChange}
                    />
                    <small></small>
                    <span></span>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Mật Khẩu"
                        name="matkhau"
                        onChange={handleChange}
                    />
                    <small></small>
                    <span></span>
                </div>

                <div class="form-control-radio">
                    <label for="role">Vai trò</label>
                    <div class="radio-group">
                        <div className="radio-group-select">
                            <input type="radio" id="admin" name="vaitro" value="admin" onChange={handleChange}/>
                            <label htmlFor="admin">Admin</label>
                        </div>

                        <div className="radio-group-select">
                            <input type="radio" id="nu" name="vaitro" value="nu" onChange={handleChange}/>
                            <label htmlFor="nu">Thủ Thư</label>
                        </div>

                        <div className="radio-group-select">
                            <input type="radio" id="manager" name="vaitro" value="manager" onChange={handleChange}/>
                            <label htmlFor="manager">Quản Lý</label>
                        </div>

                        <div className="radio-group-select">
                            <input type="radio" id="user" name="vaitro" value="user" onChange={handleChange}/>
                            <label htmlFor="user">Bạn Đọc</label>
                        </div>
                    </div>
                </div>


                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Họ Và Tên"
                        name="hovaten"
                        onChange={handleChange}
                    />
                    <span></span>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Ngày sinh (theo định dạng YYYY-MM-DD)"
                        name="ngaysinh"
                        onChange={handleChange}
                    />
                    <small></small>
                    <span></span>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Số CCCD (12 chữ số)  -- nếu có"
                        name="socccd"
                        onChange={handleChange}
                    />
                    <small></small>
                    <span></span>
                </div>

                <div class="form-control-radio">
                    <label for="role">Giới tính</label>
                    <div class="radio-group">
                        <div className="radio-group-select">
                            <input type="radio" id="nam" name="gioitinh" value="Nam" onChange={handleChange}/>
                            <label htmlFor="nam">Nam</label>
                        </div>

                        <div className="radio-group-select">
                            <input type="radio" id="nu" name="gioitinh" value="Nữ" onChange={handleChange}/>
                            <label htmlFor="nu">Nữ</label>
                        </div>
                    </div>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Số điện thoại"
                        name="sodienthoai"
                        onChange={handleChange}
                    />
                    <small></small>
                    <span></span>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />
                    <small></small>
                    <span></span>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Địa chỉ"
                        name="diachi"
                        onChange={handleChange}
                    />
                    <span></span>
                </div>

                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Quê quán"
                        name="quequan"
                        onChange={handleChange}
                    />
                    <span></span>
                </div>

                

                <div className="btn">
                    <button type="submit" className="btn-huy" onClick={() =>{
                        navigate("/account")
                    }}>Huỷ</button>
                    <button type="submit" className="btn-them" onClick={hanldeOnClick}>Thêm</button>
                </div>

                

            </div>
        </div>
    )
}

export default ThemTaiKhoan;