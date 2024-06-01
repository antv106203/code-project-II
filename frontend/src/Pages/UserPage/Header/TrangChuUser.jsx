
import './Header.css';
import iconsach from './imgae/logosach.png';
import { useContext } from 'react';
import { AuthContext } from '../../../../src/context/auth_Context';
import logohome from './imgae/logohome.png';
import { useState } from 'react';
import { useEffect } from 'react';
import banner1 from './imgae/banner1.png';
import banner2 from './imgae/banner2.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Header = () =>{
    const navigate = useNavigate();
    const {listSach, listTheLoaiSach, currentUser, selected, setSelected,logout} = useContext(AuthContext);
    const [type, setType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [text , setText] =useState('');
    
    
    const [dsSach, setDsSach] = useState(listSach);
    const handleLogout = () =>{
        navigate('/');
        logout();
    }
    

    console.log("moi vaotrang selected là:", selected);
    console.log("danh sách sách:", dsSach);
   
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
                                    <input  type='text' placeholder='Nhập sách cần tìm kiếm' value= {text} onChange={(e) =>{
                            
                                        setText(e.target.value);
                                    }}/>
                                    <button onClick={() => {
                                        setType(`Kết quả tìm kiếm cho ${text}`); console.log("type: ", type);
                                        const ds2  = listSach.filter(sach => sach.tensach.toUpperCase().includes(text.toUpperCase()) || sach.tacgia.toUpperCase().includes(text.toUpperCase()));
                                        setDsSach(ds2);
                                        setText('');
                                    }}
                                    > Tìm kiếm 
                                    </button>
                                </div>
                            </div>

                            <div className='header-bottom-main-right'>
                                <div className='logo-home-container' onClick={() =>{navigate('/user'); console.log("click")}}>
                                    <i class="fa-solid fa-house" style={{fontSize: '30px' , color: '#21D375'}}></i>
                                    <a rel='nofollow'>Trang chủ</a>
                                </div>

                                <div className='logo-taikhoan-container' onClick={() =>{navigate('/user/taikhoan')}}>
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
                                    
                                <div className='logo-chopheduyet-container' onClick={handleLogout}>
                                    <i class="fa-solid fa-power-off" style={{fontSize: '30px' , color: '#21D375' , marginLeft: '10px'}}></i>
                                </div>
                            </div>
                        </div>

                        <div className='main-bot'>
                            
                        </div>
                    </div>
                </div>

                

                <div className='header-center'>

                    <div className='danhmuc-container'>
                        <div className='Tieu_de'>
                            Danh mục 
                        </div>
                        <div className='muc' key='a' onClick={() =>{
                            setType('Tất cả sách');
                            setDsSach(listSach);
                        }}>
                            <i class="fa-solid fa-book"  style={{marginLeft: '10px' , color: '#21D375'}}></i>
                            Tất cả sách
                        </div>
                        
                            { listTheLoaiSach && listTheLoaiSach.length > 0 && 
                                    listTheLoaiSach.map((item, index) => (
                                        <div className='muc' key ={index} onClick={() =>{
                                            setType(item.tentheloaisach)
                                            const  dsSach1 = listSach.filter(sach => sach.tentheloaisach === item.tentheloaisach)
                                            setDsSach(dsSach1);
                                        }}>
                                            <i class="fa-solid fa-book"  style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                            {item.tentheloaisach}
                                        </div>
                                    ))  
                            }
                    </div>

                    <div className='sanpham-container'>
                        <div className='xinchao'>
                            <h2 >
                                Thư viện Sách
                            </h2>
                        </div>

                        <div className='banner-sach'>
                            <div className='banner-sach1'>
                                <img src={banner1} style={{width: '100%' , height: '100%',borderRadius: '10px'}}/>
                            </div>

                            <div className='banner-sach2'>
                                <img src={banner2} style={{width: '100%' ,height: '100%', borderRadius: '10px'}}/>
                            </div>
                        </div>

                        <div className='sanpham'>
                            <div className='tieude_tatca'>
                                
                                    <h5>{type ? type : "Tất cả sách"}</h5>
                                
                            </div>

                            <div className='item-container'>
                                {dsSach && dsSach.length > 0 &&
                                 dsSach.map((item, index) =>(
                                    <div className='item' key={index} 
                                        onClick={(e) =>{
                                            setSelected(item);
                                            console.log(selected);
                                            navigate('/user/detailsach');
                                        }}
                                    >
                                        <img src={item.image} />
                                        <h6>{item.tensach}</h6>
                                        <h7>{item.tacgia}</h7>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Header;