
import './TaiKhoan.css';
//import iconsach from './imgae/logosach.png';
import { Children, useContext } from 'react';
import { AuthContext } from '../../../context/auth_Context.js';
//import logohome from './imgae/logohome.png';
import { useState } from 'react';
import { useEffect } from 'react';
// import banner1 from './imgae/banner1.png';
// import banner2 from './imgae/banner2.png';
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
const TaiKhoan =() =>{
    const {listSach, listTheLoaiSach, currentUser, selected, setSelected} = useContext(AuthContext);
    const navigate = useNavigate();
    const [text , setText] =useState('');
    const [status, setStatus] =  useState('Đã mượn')
    const [data1, setData1] = useState(null);
    const [chon, setChon] = useState(null);
    const [taiKhoan, setTaiKhoan] = useState(false);

    const [truyvan, setTruyvan] = useState({
        id_nguoimuon: currentUser.idtaikhoan,
    })
    console.log("chọn" ,chon);
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (status === "Đã mượn") {
              const response = await axios.post('http://localhost:4000/api/muontrasach/dkimuonsach/damuon', truyvan);
              setData1(response.data);
            } else if (status === "Đã phê duyệt") {
              const response = await axios.post('http://localhost:4000/api/muontrasach/dkimuonsach/dapheduyet', truyvan);
              setData1(response.data);
            } else if (status === "Chờ phê duyệt") {
                const response = await axios.post('http://localhost:4000/api/muontrasach/dkimuonsach/chopheduyet', truyvan);
                setData1(response.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [status]);
    console.log(status)
    console.log("Data: ",data1)


    const handleOnTimKiem = () =>{
        if(1){
            const ds1  = data1.filter(sach => sach.tensach.toUpperCase().includes(text.toUpperCase()));
            setData1(ds1);
            setText('');
        }
    }

    return(
        <div className="header">
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
                                    <input  type='text' placeholder='Nhập sách cần tìm kiếm' 
                                    />
                                    <button> Tìm kiếm </button>
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
                    <div className='muc' key='a'  onClick={() =>{setStatus("Đã mượn"); setChon(null)}}>
                        <i class="fa-solid fa-book"  style={{marginLeft: '10px' , color: '#21D375'}}></i>
                        Đã mượn
                    </div>

                    <div className='muc' key='b' onClick={() =>{setStatus("Chờ phê duyệt"); setChon(null)}}>
                        <i class="fa-solid fa-book"  style={{marginLeft: '10px' , color: '#21D375'}}></i>
                        Chờ phê duyệt
                    </div>

                    <div className='muc' key='c' onClick={() =>{setStatus("Đã phê duyệt"); setChon(null)}}>
                        <i class="fa-solid fa-book"  style={{marginLeft: '10px' , color: '#21D375'}}></i>
                        Đã phê duyệt
                    </div>
                </div>

                <div className='show-ds'>
                    <div className='show-ds-tieude'>
                        <h5>{status}</h5>
                    </div>

                    <div className='thanhtimkiem'>
                        <img src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png" alt="icon-search" />
                        <input  type='text' placeholder='Nhập sách cần tìm kiếm' value={text} onChange={(e) =>{
                            setText(e.target.value);
                        }}/>
                        <button onClick={handleOnTimKiem}> Tìm kiếm </button>
                    </div>

                    <div className='show-ds-list'>
                        { data1 && data1.length && 
                        
                         data1.map((item, index) =>(
                            <div className='cell' key={index} onClick={() => {setChon(item)}}>
                                <img src={item.image}/>
                                <div className='cell-con'>
                                    <h9> <strong>Tên sách : </strong> {item.tensach}</h9>
                                    <h9> <strong>Tác giả : </strong> {item.tacgia}</h9>

                                </div>

                            </div>
                         ))
                        }
                    </div>
                </div>
                { taiKhoan === false && 
                <div className='thongtinmuonsach'>
                    
                    <h5>{status === 'Đã mượn' ? 'Phiếu mượn sách' : 'Phiếu đăng kí mượn sách' }</h5>
                    <div className='tt'>
                        { status === 'Đã mượn' ? chon ? (
                            <div className='c'>
                                <h7> <strong>Mã phiếu: </strong> {chon.maphieu} </h7>
                                <h7><strong>Mã sách: </strong> {chon.masach} </h7>
                                <h7><strong>Tên sách: </strong> {chon.tensach} </h7>
                                <h7><strong>Tác giả:  </strong> {chon.tacgia} </h7>
                                <h7><strong>Thể loại: </strong> {chon.tentheloaisach} </h7>
                                <h7><strong>Ngày mượn:  </strong> {chon.ngaymuon.slice(0,10)} </h7>
                                <h7><strong>Ngày trả dự kiến: </strong> {chon.ngaytradukien.slice(0,10)} </h7>
                                <h7><strong>Tình trạng sách khi mượn:  </strong> {chon.tinhtrangsachkhimuon} </h7>
                                { chon.datra === true ? (
                                    <>

                                    <h7><strong>Ngày trả:  </strong> {chon.tinhtrangsachkhitra} </h7>
                                    <h7><strong>Tình trạng sách khi trả:  </strong> {chon.tinhtrangsachkhitra} </h7>
                                    </>
                                ) : null
                                
                                }
                            </div>
                            ) : null
                           : chon ? (
                             <div className='c'>
                                <h7> <strong>Mã phiếu: </strong> {chon.stt} </h7>
                                <h7><strong>Mã sách: </strong> {chon.masach} </h7>
                                <h7><strong>Tên sách: </strong> {chon.tensach} </h7>
                                <h7><strong>Tác giả:  </strong> {chon.tacgia} </h7>
                                <h7><strong>Thể loại: </strong> {chon.tentheloaisach} </h7>
                                <h7><strong>Ngày đăng ký mượn:  </strong> {chon.ngaydangki.slice(0,10)} </h7>
                                <h7><strong>Ngày trả dự kiến: </strong> {chon.thoihan.slice(0,10)} </h7>
                                <h7><strong>Số lượng:  </strong> {chon.soluong} </h7>
                             </div>
                           ) : null
                        }
                    </div>
                    
                </div>
                }
                
            </div>
        </div>
    )
}

export default TaiKhoan