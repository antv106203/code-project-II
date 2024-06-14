import { useState } from 'react';
import './TrangChuStaff.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth_Context';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
const TrangChuStaff = () =>{
    const currentDate = new Date();
    


    

    // Lấy năm, tháng, ngày
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0, nên cộng thêm 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Tạo chuỗi ngày tháng năm ở định dạng "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;
    const navigate = useNavigate();
    const [click, setClick] = useState('Sách');
    const {listSach, listTheLoaiSach, currentUser,logout} = useContext(AuthContext);
    const [type, setType] = useState(null);
    const [dsSach, setDsSach] = useState(listSach);
    const [text , setText] =useState('');
    const [status, setStatus] =  useState(null);
    const [data1, setData1] = useState(null);
    const [chon, setChon] = useState(null);
    const [dudieukien, setDudieukien] = useState();
    const [selectSach, setSelectSach] = useState(null);
    const [pheduyet , setPheDuyet] = useState({
        id_nguoipheduyet: currentUser.idtaikhoan,
        dongy : '',
        stt : ''
    })

    const [trangThaiKhiMuonText, setTrangThaiKhiMuonText] = useState(null);
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    //console.log(getCurrentDate());
    //console.log(selectSach)
    const [muonSach, setMuonSach] = useState({
        id_nguoimuon: null,
        id_nhanvien : currentUser.idtaikhoan,
        masach : null,
        matheloaisach : '',
        ngaymuon : '',
        ngaytradukien: '',
        tinhtrangsachkhimuon: null,
        ngaydkimuon: '',
        soluong : null,
        stt: null,
    })
    //console.log(muonSach);
    //console.log(chon);
    //console.log(currentUser);
    //console.log(data1);
    //console.log("click: ",pheduyet);
    //console.log(trangThaiKhiMuonText);
    const [traSach , setTraSach] = useState({
        datra : true,
        tinhtrangsachkhitra : null,
        ngaytra: formattedDate,
        maphieu: null
    })

    //console.log(traSach)

    
    const fetchData = async () => {
        try {

          if(muonSach.tinhtrangsachkhimuon === ''){
            alert("vui lòng điền tình trạng sách");
          }
          else{
          if (status === "Đang chờ phê duyệt") {
            const response = await axios.get('http://localhost:4000/api/muontrasach/dkimuonsach/dangchopheduyet');
            setData1(response.data);
          } else if (status === "Đã phê duyệt") {
            const response = await axios.get('http://localhost:4000/api/muontrasach/dkimuonsach/dapheduyet_staff');
            setData1(response.data);
          } else if(status === 'Đang mượn'){
            const response = await axios.get('http://localhost:4000/api/muontrasach/dkimuonsach/dangmuon_staff');
            setData1(response.data);
          } else if(status === "Đã trả"){
            const response = await axios.get('http://localhost:4000/api/muontrasach/dkimuonsach/datra_staff');
            setData1(response.data);
          }
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    
      };
    useEffect(() => {
        
        fetchData();
        setChon(null);
      }, [status]);
    //console.log(click);
    //console.log(text);
    //console.log(localStorage.getItem("selectedSach"))
    //console.log(localStorage);

    const xetdk = (input) =>{
        if(input.soluong > input.soluongconlai){
            setDudieukien(false);
        }
        else{
            if(input.diemtru > 3){
                setDudieukien(false);
            }
            else{
                setDudieukien(true);
                
            }
        }

    }

    const xetpheduyet = (input) =>{
        if(input.soluong > input.soluongconlai){
            setPheDuyet({
                id_nguoipheduyet: currentUser.idtaikhoan,
                dongy : false,
                stt : input.stt,
            })
            
        }
        else{
            if(input.diemtru > 3){
                setPheDuyet({
                    id_nguoipheduyet: currentUser.idtaikhoan,
                    dongy : false,
                    stt : input.stt
                })
            }
            else{
                setPheDuyet({
                    id_nguoipheduyet: currentUser.idtaikhoan,
                    dongy : true,
                    stt : input.stt
                })
                
            }
        }

    }

    const xetMuonSach = (input) =>{
        setMuonSach({
            id_nguoimuon: input.id_nguoimuon,
            id_nhanvien : currentUser.idtaikhoan,
            masach : input.masach,
            matheloaisach : input.matheloaisach,
            ngaymuon : getCurrentDate(),
            ngaytradukien: input.thoihan.slice(0,10),
            tinhtrangsachkhimuon: null,
            ngaydkimuon: input.ngaydangki.slice(0,10),
            soluong : input.soluong,
            stt: input.stt
        })

    }

    const xetTrasach = (input) =>{
        setTraSach({
            datra : true,
            tinhtrangsachkhitra : null,
            ngaytra: formattedDate,
            maphieu: input.maphieu,
        })

    }

    const handleClick = async () => {
        
          const res = await axios.put("http://localhost:4000/api/muontrasach/dkimuonsach/pheduyet", pheduyet);
          if (res.data === "Thành công") {
            alert("xét phê duyệt thành công, trạng thái sẽ được gửi đến người mượn");
            await fetchData(); // Gọi lại fetchData để cập nhật data1
            setChon(null);
          } else {
            alert("lỗi");
          }
      };


      const handleClickMuonSach = async () =>{
        
            if(muonSach.tinhtrangsachkhimuon === ''){
                alert("vui lòng điền tình trạng sách")
            }
            else{
            const res = await axios.post("http://localhost:4000/api/muontrasach/dkimuonsach/xoakhoibangpheduyet", muonSach);
            if (res.data === "Thành công") {
              const res1 = await axios.post('http://localhost:4000/api/muontrasach/muonsach/muon', muonSach)
              if(res1.data === 'Thành công'){
                alert("Mượn sách thành công")
                await fetchData(); // Gọi lại fetchData để cập nhật data1
                setChon(null);
                //setTrangThaiKhiMuonText(null)
              }
              else{
                alert("Lỗi");
              }
            }
            else{
                alert("Lỗi");
            }
        }
          
      }

      const handleClickTraSach = async () => {
        if(traSach.tinhtrangsachkhitra === ''){
            alert("vui lòng điền tình trạng sách khi trả")
        }
        else{
        const res = await axios.put("http://localhost:4000/api/muontrasach/muonsach/tra", traSach);
        if (res.data === "Thành công") {
          alert("Trả sách thành công");
          await fetchData(); // Gọi lại fetchData để cập nhật data1
          setChon(null);
        } else {
          alert("lỗi");
        }
    }
    };

    //console.log(dudieukien);
    return(
            <div className='trangchustaff'>
                <div className='navbar'>
                    <div
                    className={`danhmuc-item ${click === 'Sách' ? 'active' : ''}`}
                    onClick={() => {setClick('Sách'); setChon(null); setType("Tất cả sách"); setDsSach(listSach)}}
                    >
                    Sách
                    </div>
                    <div
                    className={`danhmuc-item ${click === 'Mượn trả sách' ? 'active' : ''}`}
                    onClick={() => {setClick('Mượn trả sách')
                                    setStatus("Đang chờ phê duyệt");
                                    setChon(null);
                    }}
                    >
                    Mượn trả sách
                    </div>
                    <div
                    className={`danhmuc-item ${click === 'Tài Khoản' ? 'active' : ''}`}
                    onClick={() => {setClick('Tài Khoản');
                        setChon(null);
                    }}
                    >
                    Tài Khoản
                    </div>

                    <div className='Dangxuat' onClick={() =>{
                        navigate('/login');
                        logout();
                    }}>
                        <h7>Đăng xuất</h7>
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className='center'>
                    { click === 'Sách' ? ( 
                    <>
                        <div className='dms'>
                            <div className='Tieu_de'>
                                Danh mục 
                            </div>
                            <div className='muc' key='a5' onClick={() =>{
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
                        <div className='sanpham1'>
                            <div className='timkiemsach'>
                            <img src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png" alt="icon-search" />
                                    <input  type='text' placeholder='Nhập sách cần tìm kiếm' value={text} onChange={(e) => {
                                        setText(e.target.value);
                                    }}
                                    />
                                    <button onClick={() =>{
                                        setType(`Kết quả tìm kiếm cho ${text}`);
                                        const ds2  = listSach.filter(sach => sach.tensach.toUpperCase().includes(text.toUpperCase()) || sach.tacgia.toUpperCase().includes(text.toUpperCase()));
                                        setDsSach(ds2);
                                        setText('');
                                    }}
                                    > Tìm kiếm 
                                    </button>
                            </div>

                            <div className='tieude_tatca'>
                                    
                                <h5>{type ? type : "Tất cả sách"}</h5>
                                
                            </div>
                            <div className='tatcasach'>
                                {dsSach && dsSach.length > 0 &&
                                    dsSach.map((item, index) =>(
                                        <div className='item' key={index}
                                            onClick={() => { localStorage.removeItem("selectedSach_staff");
                                                localStorage.setItem("selectedSach_staff", JSON.stringify(item));
                                                navigate('/staff/chitietSach')
                                                //console.log(localStorage);
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
                    </>
                    ) : click === "Mượn trả sách" ? (
                        <>
                            <div className="dms">
                                <div className='Tieu_de'>
                                    Danh mục 
                                </div>

                                <div className='muc' key='a1' onClick={() =>{setStatus('Đang chờ phê duyệt'); setChon(null)}}>
                                    <i class="fa-solid fa-spinner"  style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                    Đang chờ phê duyệt
                                </div>
                                <div className='muc' key='a2' onClick={() =>{setStatus('Đã phê duyệt'); setChon(null)}}>
                                    <i class="fa-solid fa-hourglass-start" style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                    Đã phê duyệt
                                </div>

                                <div className='muc' key='a3' onClick={() =>{setStatus('Đang mượn') ;setChon(null)}}>
                                    <i class="fa-solid fa-play" style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                    Đang mượn
                                </div>

                                <div className='muc' key='a4' onClick={() =>{setStatus('Đã trả'); setChon(null)}}>
                                    <i class="fa-solid fa-window-restore" style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                    Đã trả
                                </div>
                            </div>
                            <div className='show-ds1'>
                                <div className='show-ds-tieude1'>
                                    <h5>{status}</h5>
                                </div>
                                <div className='ds_show1'>
                                    { data1 && data1.length && 
                                
                                        data1.map((item, index) =>(
                                        <div className='cell1' key={index} onClick={() => {setChon(item); 
                                            if(status === 'Đang chờ phê duyệt'){
                                            xetdk(item); xetpheduyet(item);
                                            }
                                            else if(status === "Đã phê duyệt"){
                                                xetMuonSach(item);
                                            } else if(status === "Đang mượn"){
                                                xetTrasach(item);
                                            }
                                            
                                        }}>
                                            <img src={item.image}/>
                                            <div className='cell-con1'>
                                                <h9> <strong>Tên sách : </strong> {item.tensach}</h9>
                                                <h9> <strong>Tác giả : </strong> {item.tacgia}</h9>

                                            </div>

                                        </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='thongtinmuonsach'>
                                <h5>{status === 'Đang chờ phê duyệt' || status === 'Đã phê duyệt' ? 'Phiếu đăng kí mượn sách' : status === "Đang mượn" ?'Phiếu mượn sách' : "Phiếu Trả sách" }</h5>
                                <div className='tt'>
                                    { status === 'Đang chờ phê duyệt' ? 
                                            chon ? (
                                            <div className='c'>
                                                <h7> <strong>Mã phiếu: </strong> {chon.stt} </h7>
                                                <h7><strong>Mã sách: </strong> {chon.masach} </h7>
                                                <h7><strong>Tên sách: </strong> {chon.tensach} </h7>
                                                <h7><strong>Tác giả:  </strong> {chon.tacgia} </h7>
                                                <h7><strong>Thể loại: </strong> {chon.tentheloaisach} </h7>
                                                <h7><strong>Ngày đăng ký mượn:  </strong> {chon.ngaydangki.slice(0,10)} </h7>
                                                <h7><strong>Ngày trả dự kiến: </strong> {chon.thoihan.slice(0,10)} </h7>
                                                <h7><strong>Số lượng:  </strong> {chon.soluong} </h7>
                                                <h7><strong>Số lượng sách còn lại trong kho: </strong> {chon.soluongconlai} </h7>
                                                <hr  style={{background : '#21D375', border: '0.5px solid #21D375' ,  height: '5px', color :'#21D375'}}/>
                                                <h7><strong>Họ Và Tên Người Mượn:  </strong> {chon.hovaten} </h7>
                                                <h7><strong>Số điện thoại:  </strong> {chon.sodienthoai} </h7>
                                                <h7><strong>Email:  </strong> {chon.email} </h7>
                                                <h7>
                                                    <strong>Số lần trả muộn: </strong>
                                                    <span style={{color: chon.diemtru > 3 ? 'red' : 'green' }}>
                                                        {chon.diemtru}
                                                    </span>
                                                </h7>
                                                <hr  style={{background : '#21D375', border: '0.5px solid #21D375' ,  height: '5px', color :'#21D375'}}/>
                                                {
                                                    dudieukien === true ? (<>
                                                        <h6 style={{color: '#21D375', marginLeft: '150px'}}><strong>Ghi chú:  </strong> Đủ điều kiện mượn sách </h6>
                                                        <button style={{background: '#21D375', width: '300px' , height: '50px', marginLeft: '130px', border :'none'}} 
                                                            onClick={() => handleClick()}
                                                        > 
                                                        Chấp nhận</button>
                                                        </>
                                                    ) : (<>
                                                        <h6 style={{color: 'red', marginLeft: '130px'}}><strong>Ghi chú:  </strong> Không đủ điều kiện mượn sách </h6>
                                                        <button style={{background: 'red', width: '300px' , height: '50px', marginLeft: '130px',  border :'none'}}
                                                            onClick={() => handleClick()}
                                                        > 
                                                        
                                                        Từ chối</button>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            ) : null

                                        : status === "Đã phê duyệt"  ? 
                                            chon ? (
                                                <div className='c'>
                                                    <h7> <strong>Mã phiếu: </strong> {chon.stt} </h7>
                                                    <h7><strong>Mã sách: </strong> {chon.masach} </h7>
                                                    <h7><strong>Tên sách: </strong> {chon.tensach} </h7>
                                                    <h7><strong>Tác giả:  </strong> {chon.tacgia} </h7>
                                                    <h7><strong>Thể loại: </strong> {chon.tentheloaisach} </h7>
                                                    <h7><strong>Ngày đăng ký mượn:  </strong> {chon.ngaydangki.slice(0,10)} </h7>
                                                    <h7><strong>Ngày trả dự kiến: </strong> {chon.thoihan.slice(0,10)} </h7>
                                                    <h7><strong>Số lượng:  </strong> {chon.soluong} </h7>
                                                    <div className='tinhtrangsach'>
                                                        <label htmlFor="tinhtrangsachkhimuon"> <h6>Tình trạng sách:</h6></label>
                                                        <input
                                                            value={muonSach.tinhtrangsachkhimuon}
                                                            id='soluong'
                                                            type='text'
                                                            onChange={(e) => {
                                                                setMuonSach((prev) => ({
                                                                    ...prev,
                                                                    tinhtrangsachkhimuon : e.target.value,
                                                                }));
                                                                
                                                            }}
                                                        />
                                                    </div>
                                                    
                                                    <hr  style={{background : '#21D375', border: '0.5px solid #21D375' ,  height: '5px', color :'#21D375'}}/>
                                                    <h7><strong>Họ Và Tên Người Mượn:  </strong> {chon.hovaten} </h7>
                                                    <h7><strong>Số điện thoại:  </strong> {chon.sodienthoai} </h7>
                                                    <h7><strong>Email:  </strong> {chon.email} </h7>
                                                    <hr  style={{background : '#21D375', border: '0.5px solid #21D375' ,  height: '5px', color :'#21D375'}}/>
                                                    <h6> <strong>Vị trí đặt sách:  </strong> Kệ: {chon.ke} - Tầng: {chon.tang}</h6>
                                                    <button style={{background: '#21D375', width: '300px' , height: '50px', marginLeft: '130px', border :'none', marginTop:'10px'}} 
                                                            onClick={handleClickMuonSach}
                                                        > 
                                                        Mượn ngay
                                                    </button>
                                                </div>
                                            ) : null
                                        : status === 'Đang mượn' ? 
                                            chon ? (
                                                <div className='c'>
                                                    <h7> <strong>Mã phiếu: </strong> {chon.maphieu} </h7>
                                                    <h7> <strong>Tên sách: </strong> {chon.tensach} </h7>
                                                    <h7> <strong>Tác giả: </strong> {chon.tacgia} </h7>
                                                    <h7> <strong>Thể loại: </strong> {chon.tentheloaisach} </h7>
                                                    <h7> <strong>Ngày mượn: </strong> {chon.ngaymuon.slice(0,10)} </h7>
                                                    <h7> <strong>Ngày trả dự kiến: </strong> {chon.ngaytradukien.slice(0,10)} </h7>
                                                    <h7> <strong>tình trạng sách khi mượn </strong> {chon.tinhtrangsachkhimuon} </h7>
                                                    <div className='tinhtrangsachkhitra'>
                                                        <label htmlFor="tinhtrangsachkhitra'"> <h6>Tình trạng sách khi trả: </h6></label>
                                                        <input 
                                                            id='tinhtrangsachkhitra'
                                                            type='text'
                                                            value={traSach.tinhtrangsachkhitra}
                                                            onChange={(e) =>{
                                                                setTraSach((prev) => ({
                                                                    ...prev,
                                                                    tinhtrangsachkhitra: e.target.value
                                                                }))
                                                            }}

                                                        />
                                                    </div>

                                                    
                                                    <hr  style={{background : '#21D375', border: '0.5px solid #21D375' ,  height: '5px', color :'#21D375'}}/>

                                                    <h7> <strong> ID Người Mượn: </strong> {chon.idnguoimuon} </h7>
                                                    <h7> <strong> Họ và tên người mượn: </strong> {chon.hovatennguoimuon} </h7>
                                                    <h7> <strong> Số điện thoại người mượn: </strong> {chon.sodienthoainguoimuon} </h7>
                                                    <h7> <strong> Email người mượn: </strong> {chon.emailnguoimuon} </h7>
                                                    
                                                    <h7> <strong> ID Nhân viên:</strong> {chon.idnhanvien} </h7>
                                                    <h7> <strong> Họ và tên nhân viên:</strong> {chon.hovatennhanvien} </h7>
                                                    <h7> <strong> Số điện thoại Nhân viên: </strong> {chon.sodienthoainhanvien} </h7>
                                                    <h7> <strong> Email nhân viên:</strong> {chon.emailnhanvien} </h7>
                                                    <button className='trasachbtn' onClick={handleClickTraSach}>Trả sách</button>
                                                </div>

                                            ) : null
                                        : chon ? (
                                            <div className='c'>
                                                <h7> <strong>Mã phiếu: </strong> {chon.maphieu} </h7>
                                                <h7> <strong>Tên sách: </strong> {chon.tensach} </h7>
                                                <h7> <strong>Tác giả: </strong> {chon.tacgia} </h7>
                                                <h7> <strong>Thể loại: </strong> {chon.tentheloaisach} </h7>
                                                <h7> <strong>Ngày mượn: </strong> {chon.ngaymuon.slice(0,10)} </h7>
                                                <h7> <strong>Ngày trả dự kiến: </strong> {chon.ngaytradukien.slice(0,10)} </h7>
                                                <h7> <strong>tình trạng sách khi mượn </strong> {chon.tinhtrangsachkhimuon} </h7>
                                                <h7> <strong>Ngày trả </strong> {chon.ngaytra.slice(0,10)} </h7>
                                                <h7> <strong>tình trạng sách khi trả </strong> {chon.tinhtrangsachkhitra} </h7>
                                                <h7> <strong> ID Người Mượn: </strong> {chon.idnguoimuon} </h7>
                                                <h7> <strong> Họ và tên người mượn: </strong> {chon.hovatennguoimuon} </h7>
                                                <h7> <strong> Số điện thoại người mượn: </strong> {chon.sodienthoainguoimuon} </h7>
                                                <h7> <strong> Email người mượn: </strong> {chon.emailnguoimuon} </h7>
                                                <h7> <strong> ID Nhân viên:</strong> {chon.idnhanvien} </h7>
                                                <h7> <strong> Họ và tên nhân viên:</strong> {chon.hovatennhanvien} </h7>
                                                <h7> <strong> Số điện thoại Nhân viên: </strong> {chon.sodienthoainhanvien} </h7>
                                                <h7> <strong> Email nhân viên:</strong> {chon.emailnhanvien} </h7>
                                            </div>

                                        ) : null

                                    }
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='ttnhanvien'>
                            <div className='tieude_tt'>
                                <h5>Thông tin tài khoản</h5>
                            </div>
                            <h7> <strong>Mã tài khoản:  </strong> {currentUser.idtaikhoan} </h7>
                            <h7> <strong>Tên đăng nhập:  </strong> {currentUser.tendangnhap} </h7>
                            <h7> <strong>Họ Và Tên:  </strong> {currentUser.hovaten} </h7>
                            <h7> <strong>Vai trò:  </strong> {currentUser.vaitro} </h7>
                            <h7> <strong>Ngày sinh:  </strong> {currentUser.ngaysinh.slice(0,10)} </h7>
                            <h7> <strong>Giới tính:  </strong> {currentUser.gioitinh} </h7>
                            <h7> <strong>Số CCCD:  </strong> {currentUser.socccd} </h7>
                            <h7> <strong>Email:  </strong> {currentUser.email} </h7>
                            <h7> <strong>Số điện thoại:  </strong> {currentUser.sodienthoai} </h7>
                            <h7> <strong>Địa chỉ:  </strong> {currentUser.diachi} </h7>
                            <h7> <strong>Quê quán:  </strong> {currentUser.quequan} </h7>
                            <h7> <strong>Ngày cấp:  </strong> {currentUser.ngaycap.slice(0,10)} </h7>
                            <h7> <strong>Ngày hết hạn:  </strong> {currentUser.ngayhethan.slice(0,10)} </h7>



                        </div>
                    )
                    }
                </div>
            
            </div>
    )
}

export default TrangChuStaff;