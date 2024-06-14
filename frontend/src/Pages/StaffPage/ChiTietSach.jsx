import './ChiTietSach.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth_Context';

const ChiTietSach = () =>{
    const selected = JSON.parse(localStorage.getItem("selectedSach_staff"))
    
        //const selected= JSON.parse(selectedo);
            //console.log(selectedSachObject);
    //console.log(selected)
    
    
    return(
        <div className='detail_sach'>
            <div className='top'>
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

            <div className='center'>
                <div className='detail_sanpham'>
                    <img src={selected.image} className='anh'/>
                    <h6>{selected.tensach}</h6>
                    <h7>{selected.tacgia}</h7>
                </div>

                <div className='thongtinsach1'>

                    <h3 style={{marginLeft: '200px'}}>Thông tin chi tiết</h3>
                    <br />
                    <h5>
                        <strong>Tên sách: </strong> {selected.tensach}
                    </h5>

                    <h6>
                        <strong>Tác giả: </strong> {selected.tacgia}
                    </h6>

                    <h6>
                        <strong>Số trang: </strong> {selected.sotrang}
                    </h6>

                    <h6>
                        <strong>Nhà xuất bản: </strong>{selected.tennhaxuatban}
                    </h6>
                    <h6>
                        <strong>Năm xuất bản: </strong> {selected.namxuatban}
                    </h6>
                    <h6>
                        <strong>Tái bản lần thứ: </strong> {selected.taiban}
                    </h6>
                    <h6>
                        <strong>Thể loại sách: </strong> {selected.tentheloaisach}
                    </h6>

                    <h6>
                        <strong>Thông tin sách: </strong>
                        <br />
                        {selected.preview}
                    </h6>

                    <h6>
                        <strong>Vị trí: </strong>   Kệ {selected.ke} - Tầng {selected.tang}
                    </h6>

                    <h6>
                        <strong>Số lượng sách còn lại: </strong> {selected.soluongconlai}
                    </h6>

                    <h6>
                        <strong>Số lượt mượn: </strong> {selected.luotmuon}
                    </h6>
                    <h6>
                        <strong>Số lượng sách cần thay thế: </strong> {selected.soluongsachcanthaythe}
                    </h6>
                </div>
            </div>

        </div>
    )
}

export default ChiTietSach;