
import '../UserPage/DetailSach.css'
//import iconsach from './imgae/logosach.png';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth_Context.js';
//import logohome from './imgae/logohome.png';
import { useState } from 'react';
import { useEffect } from 'react';
// import banner1 from './imgae/banner1.png';
// import banner2 from './imgae/banner2.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const DetailSach = () =>{
    const currentDate = new Date();


    

    // Lấy năm, tháng, ngày
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0, nên cộng thêm 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Tạo chuỗi ngày tháng năm ở định dạng "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    const navigate = useNavigate();
    const [text , setText] =useState('');
    const {listSach, listTheLoaiSach, currentUser, selected, setSelected} = useContext(AuthContext);
    const [muontrasach, setMuontrasach] = useState({
        id_nguoimuon : currentUser.idtaikhoan,
        masach: selected.masach,
        matheloaisach: selected.matheloaisach,
        thoihan: '',

    })
    console.log(muontrasach);
    const handleChange  = (e) =>{
        setMuontrasach((prev) =>({
            ...prev,
            thoihan: parseInt(e.target.value),
        }))
    }

    const hanldeOnClick = async() =>{
        const res = await axios.post('http://localhost:4000/api/muontrasach/dkimuonsach',muontrasach);
        if(res.data === 'Thành công'){
            alert("Đăng kí mượn sách thành công, chờ phê duyệt yêu cầu")
            navigate('/user');
            
        }
        else{
            alert("có lỗi xảy ra");
        }
    }
    return(
        <div className='header'>
            
                <div className='header-top'>

                    <div className='icon-container'>
                        <a href='https://www.facebook.com/thao.tao.75248' target='_blank' className='fb-icon'>
                            <i className="fa-brands fa-facebook-f" style={{ color: 'white' }}></i>
                        </a>

                        <a href='https://www.instagram.com/antu100603/' target='_blank' className='ins-icon'>
                            <i class="fa-brands fa-instagram" style={{ color: 'white' }}></i>
                        </a>

                        <a href='https://www.youtube.com/' target='_blank' className='ytb-icon'>
                            <i class="fa-brands fa-youtube" style={{ color: 'white' }}></i>
                        </a>
                    </div>

                    <div className='hotro-container'>
                        <i class="fa-solid fa-ticket-simple" style={{ color: 'white',marginRight: '10px' }}></i>
                        <marquee behavior="scroll" direction="left" style={{color: 'white'}}>
                            "Chào mừng bạn đến với website mượn/trả sách của tôi. Hãy liên hệ với chúng tôi qua hotline: (+84) 1900123456 hoặc email: an106203h@gmail.com"
                        </marquee>
                    </div>

                    <div className='tt-container'>
                        <a href='tel: (+84) 1900571595' style={{color: 'white' , textDecoration: 'none' , marginRight: '50px'}} target='_blank'>
                            <i class="fa-solid fa-phone" style={{color: 'white' ,  marginRight: '10px'}}></i>
                            (+84) 1900571595
                        </a>

                        <a href='mailto:an106203h@gmail.com' style={{color: 'white' , textDecoration: 'none'}} target='_blank'>
                            <i class="fa-solid fa-envelope" style={{color: 'white' , marginRight: '10px'}}></i>
                            an106203h@gmail.com
                        </a>
                    </div>

                </div>

                <div className='header-bottom'>

                    <div className='logolibrary-container'>
                        <a href='/user'>
                            <img src='https://thuviengreenlibrary.org/wp-content/uploads/2022/03/green1.png' />
                        </a>
                    </div>

                    <div className='header-bottom-main'>
                        <div className='main-top'>
                            <div className='header-bottom-main-left'>
                                <div className='left-chia'>
                                    <img src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png" alt="icon-search" />
                                    <input  type='text' placeholder='Nhập sách cần tìm kiếm' onChange={(e) =>{
                                        setText(e.target.value);
                                    }}/>
                                    <button> Tìm kiếm </button>
                                </div>
                            </div>

                            <div className='header-bottom-main-right'>
                                <div className='logo-home-container' onClick={() =>{navigate('/user'); console.log("click")}}>
                                    <i class="fa-solid fa-house" style={{fontSize: '30px' , color: '#21D375'}}></i>
                                    <a rel='nofollow'>Trang chủ</a>
                                </div>

                                <div className='logo-taikhoan-container'>
                                    <i class="fa-solid fa-user"  style={{fontSize: '30px' , color: '#21D375'}}></i>
                                    <a rel='nofollow'>Tài khoản</a>
                                </div>

                                <div className='popup'>
                                    <div  className='popup-item'>
                                        {currentUser.hovaten}
                                    </div>

                                    <div  className='popup-item'>
                                        {currentUser.vaitro}
                                    </div>

                                    <div  className='popup-item'>
                                        {currentUser.tendangnhap}
                                    </div>
                                </div>

                                <div className='logo-chopheduyet-container'>
                                    <i class="fa-solid fa-bell" style={{fontSize: '30px' , color: '#21D375' , marginLeft: '10px'}}></i>
                                    
                                </div>
                            </div>
                        </div>

                        <div className='main-bot'>
                            
                        </div>
                    </div>
                </div>

                <div className='header-center'>
                    <div className='detail-sanpham'>
                        <img src={selected.image} className='anhcha'/>
                        <h6>{selected.tensach}</h6>
                        <h7>{selected.tacgia}</h7>
                    </div>

                    <div className='thongtinsach'>

                        <h3 style={{marginLeft: '150px'}}>Thông tin chi tiết</h3>
                        <br />
                        <h5>
                            Tên sách: {selected.tensach}
                        </h5>

                        <h6>
                            Tác giả: {selected.tacgia}
                        </h6>

                        <h6>
                            Số trang: {selected.sotrang}
                        </h6>

                        <h6>
                            Nhà xuất bản: {selected.tennhaxuatban}
                        </h6>
                        <h6>
                            Năm xuất bản: {selected.namxuatban}
                        </h6>
                        <h6>
                            Tái bản lần thứ: {selected.taiban}
                        </h6>
                        <h6>
                            Thể loại sách: {selected.tentheloaisach}
                        </h6>

                        <h6>
                            Thông tin sách: 
                            <br />
                            {selected.preview}
                        </h6>
                    </div>

                    <div className='dangkimuon'>
                        <h4>Thông tin đăng kí mượn</h4>
                        <br/>
                        <h6>Tên sách : {selected.tensach}</h6>
                        <h6>Số lượng : 1</h6>
                        <div className='luachonthoihanmuon'>
                            <label htmlFor="thoihanmuon"> <strong>Thời hạn mượn: </strong></label>

                            <select id='thoihanmuon' onChange={handleChange}>
                                <option disabled selected> Lựa chọn</option>
                                <option value='1'> 1 Tháng </option>
                                <option value="2"> 2 Tháng </option>
                                <option value="3"> 3 Tháng </option>
                                <option value="4"> 4 Tháng </option>
                            </select>
                        </div>
                        <br />

                        <h6>Ngày đăng kí mượn: {formattedDate}</h6>
                        <br></br>

                        <button className='dangkimuon-btn' onClick={hanldeOnClick}>Đăng kí mượn ngay</button>

                    </div>
                </div>
        </div>
    )
}

export default DetailSach;