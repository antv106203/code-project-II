import { useState,useContext, useEffect } from 'react';
import './TrangChuManager.css'
import { AuthContext } from '../../context/auth_Context';
import { useNavigate } from 'react-router-dom';
import { PieChart } from "@mui/x-charts"
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DatePicker from "react-datepicker";


const TrangChuManager = () =>{
    const [click, setClick] = useState('Sách');
    const {listSach, listTheLoaiSach, currentUser,logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const [type, setType] = useState(null);
    const [dsSach, setDsSach] = useState(listSach);
    const [text , setText] =useState('');
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState([
    ])
    const [khoangThoiGianThongKe, setKhoanThoiGianThongKe] = useState({
        tungay: null,
        denngay: null
    })

    const [dataTheLoai, setDataTheLoai] = useState()
    const [dataTheoThoiGianSach, setDataTheoThoiGianSach] = useState();
    const [dataTheoThoiGianTheLoaiSach, setDataTheoThoiGianTheLoaiSach] = useState();
    const [status, setStatus] = useState("Nổi bật trong tháng");
     //console.log(click)
     useEffect(() => {
        const fetchBorrowedBooks = async () => {
          const response = await axios.get('http://localhost:4000/api/thongke/noibatthang')
          setData(response)
        };
        fetchBorrowedBooks();

        const fetchTheLoaiSachNoiBat = async () => {
            const response1 = await axios.get('http://localhost:4000/api/thongke/noibatthangtheloai')
            setDataTheLoai(response1)
          };
          fetchTheLoaiSachNoiBat();
      }, []);

      const valueFormatter = (value) => `${value} Quyển`;
      const chartSetting = {
        yAxis: [
          {
            label: 'Số lượng mượn (Quyển)',
          },
        ],
        width: 500,
        height: 470,
        title: "5 cuốn sách được mượn nhiều nhất Tháng",
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
          },
        },
      };

      const chartSetting1 = {
        yAxis: [
          {
            label: 'Số lượng mượn (Quyển)',
          },
        ],
        width: 400,
        height: 300,
        title: "5 cuốn sách được mượn nhiều nhất Tháng",
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
          },
        },
      };
    //   const rows = data.data;
    //   const rows1 = dataTheLoai.data
      //console.log(dataTheLoai.data)
      //console.log(khoangThoiGianThongKe)
      const handleClickThongKe =  async () =>{
        if(khoangThoiGianThongKe.tungay === null || khoangThoiGianThongKe.denngay === null){
            alert("chưa nhập đủ thông tin")
        }
        else{
         const res2 = await axios.post('http://localhost:4000/api/thongke/thongkesoluotmuonsachtheothoigian', khoangThoiGianThongKe);
         if(res2 === 'lỗi'){
            alert("lỗi");
         }
         else{
            const res3 = await axios.post('http://localhost:4000/api/thongke/thongkesotheloaisachtheothoigian', khoangThoiGianThongKe);
            if(res3 === "lỗi"){
                alert("lỗi")
            }
            else{
            setDataTheoThoiGianSach(res2.data);
            setDataTheoThoiGianTheLoaiSach(res3.data);
            setFlag(true);
            }
         }
        }
      }

      const handleClickLamLai = () =>{
        setKhoanThoiGianThongKe({
            tungay: null,
            denngay: null,
        })
        setDataTheoThoiGianSach();
        setDataTheoThoiGianTheLoaiSach();
        setFlag(false)
      }
    
    return(
        <div className='TrangChuManager'>
            <div className='navbar'>
                <div
                    className={`danhmuc-item1 ${click === 'Sách' ? 'active' : ''}`}
                    onClick={() =>{setClick('Sách');
                        setType("Tất cả sách");
                        setDsSach(listSach);
                    }}
                    >
                    Sách
                    </div>
                    <div
                    className={`danhmuc-item1 ${click === 'Thống kê' ? 'active' : ''}`}
                    onClick={() => {setClick('Thống kê')}}
                    >
                    Thống kê
                    </div>
                    <div
                    className={`danhmuc-item1 ${click === 'Tài khoản' ? 'active' : ''}`}
                    onClick={() => {setClick('Tài khoản')}}
                    >
                    Tài khoản
                    </div>
                    <div className='dangxuat' onClick={() =>{
                        navigate('/login');
                        logout();
                    }}>
                        <h7>Đăng xuất</h7>
                        <i className="fa-solid fa-left-from-bracket"></i>
                    </div>
            </div>

            <div className='trangchustaff_center'>
                    { click === "Sách" ? 
                    (
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
                                            setType(`Kết quả tìm kiếm cho  '${text}'`);
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
                                                onClick={() => { localStorage.removeItem("selectedSach");
                                                    localStorage.setItem("selectedSach_manager", JSON.stringify(item));
                                                    navigate('/manager/chitietSach')
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
                    )
                    : click === "Thống kê" ? (
                        <>  
                            <div className='dms'>
                                <div className='Tieu_de'>
                                    Danh mục 
                                </div>
                                <div className='muc' key='b'  onClick={() => {setStatus('Nổi bật trong tháng')}}>
                                    <i class="fa-solid fa-chart-simple" style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                    Nổi bật trong tháng
                                </div>
                                <div className='muc' key='c' onClick={() => {setStatus('Theo thời gian')}} >
                                    <i class="fa-solid fa-chart-simple" style={{marginLeft: '10px' , color: '#21D375'}}></i>
                                    Theo thời gian
                                </div>

                            </div>
                            <div className='thongke'>

                                
                                <div className='tieudethongke'> <strong> {status}</strong></div>
                                {
                                status === "Nổi bật trong tháng" ? (
                                    <>
                                <div className='bieudo'>
                                    <BarChart
                                        dataset={data.data}
                                        xAxis={[{ scaleType: 'band', dataKey: 'id' }]}
                                        series={[
                                            { dataKey: 'luotmuon', valueFormatter, color: '#21D375' },
                                            
                                        ]}
                                        {...chartSetting}
                                    />
                                    <TableContainer component={Paper} className='bangthongke' style={{width: '600px', height: '500px'}}>
                                        <Table  aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">ID</TableCell>
                                                <TableCell align="center">Tên sách</TableCell>
                                                <TableCell align="center">Lượt mượn&nbsp;(quyển)</TableCell>
                                                
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {data.data.map((row) => (
                                                <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">{row.tensach}</TableCell>
                                                <TableCell align="center">{row.luotmuon}</TableCell>
                                                
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div style={{marginLeft: '70px', marginBottom: '40px'}}> <strong>5 cuốn sách được mượn nhiểu nhất tháng</strong></div>

                                <div className="bieudo1">
                                    <PieChart
                                        series={[
                                        {
                                            data: dataTheLoai.data
                                        }
                                        ]}
                                        width={500}
                                        height={200}
                                    />

                                    <TableContainer component={Paper} className='bangthongke' style={{width: '580px', height: '300px'}}>
                                        <Table  aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">ID</TableCell>
                                                <TableCell align="center">Tên Thể Loại Sách</TableCell>
                                                <TableCell align="center">Lượt mượn&nbsp;(quyển)</TableCell>
                                                
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {dataTheLoai.data.map((row) => (
                                                <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">{row.label}</TableCell>
                                                <TableCell align="center">{row.value}</TableCell>
                                                
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <div style={{marginLeft: '70px', marginBottom: '40px'}}> <strong>Các thể loại sách được mượn trong tháng</strong></div>
                                </>
                                ) : (
                                    <div className='thongketheothoigian'>
                                        <div className='nhapyeucau'>
                                            <div className='nhapyeucau_tieude'>
                                                Nhập thời gian cần thống kê
                                            </div>
                                            <div className='nhapyeucau_thoigian'>
                                                <div className='tungay'>
                                                    <label> <h6>Từ ngày:</h6></label>
                                                    <DatePicker
                                                        selected={khoangThoiGianThongKe.tungay}
                                                        onChange={date => {
                                                            const formattedDate = date.toISOString().substring(0, 10);
                                                            setKhoanThoiGianThongKe(prev =>(
                                                                {
                                                                    ...prev,
                                                                    tungay: formattedDate
                                                                }
                                                            ))
                                                        }}
                                                        dateFormat='dd-MM-yyyy'
                                                        //minDate={new Date()}
                                                        showYearDropdown
                                                        showMonthDropdown
                                                    />
                                                </div>

                                                <div className='denngay'>
                                                    <label> <h6>Đến ngày:</h6></label>
                                                    <DatePicker
                                                        selected={khoangThoiGianThongKe.denngay}
                                                        onChange={date => {
                                                            const formattedDate = date.toISOString().substring(0, 10);
                                                            setKhoanThoiGianThongKe(prev =>(
                                                                {
                                                                    ...prev,
                                                                    denngay: formattedDate
                                                                }
                                                            ))
                                                        }}
                                                        dateFormat='dd-MM-yyyy'
                                                        //minDate={new Date()}
                                                        showYearDropdown
                                                        showMonthDropdown
                                                    />
                                                </div>
                                            </div>
                                            <div className='chucnang' style={{display: 'flex', flexDirection: 'row' , gap: '40px'}}>
                                                <button className='thongke_btn' onClick={handleClickThongKe}> Thống kê</button>
                                                <button className='lamlaibtn' onClick={handleClickLamLai}> Làm lại</button>
                                            </div>
                                            
                                        </div>

                                        <div className='thongketheoyeucau'>
                                            {flag === true ? 
                                                (<>
                                                    <div className='bieudo'>
                                                        <BarChart
                                                            dataset={dataTheoThoiGianSach}
                                                            xAxis={[{ scaleType: 'band', dataKey: 'id' }]}
                                                            series={[
                                                                { dataKey: 'luotmuon', valueFormatter, color: '#21D375' },
                                                                
                                                            ]}
                                                            {...chartSetting1}
                                                        />
                                                        <TableContainer component={Paper} className='bangthongke' style={{width: '500px', height: '300px'}}>
                                                            <Table  aria-label="simple table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">ID</TableCell>
                                                                    <TableCell align="center">Tên sách</TableCell>
                                                                    <TableCell align="center">Lượt mượn&nbsp;(quyển)</TableCell>
                                                                    
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {dataTheoThoiGianSach.map((row) => (
                                                                    <TableRow
                                                                    key={row.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                    <TableCell component="th" scope="row">
                                                                        {row.id}
                                                                    </TableCell>
                                                                    <TableCell align="left">{row.tensach}</TableCell>
                                                                    <TableCell align="center">{row.luotmuon}</TableCell>
                                                                    
                                                                    </TableRow>
                                                                ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>

                                                    <div className='bieudo1'>
                                                    <PieChart
                                                        series={[
                                                        {
                                                            data: dataTheoThoiGianTheLoaiSach
                                                        }
                                                        ]}
                                                        width={500}
                                                        height={200}
                                                    />

                                                    <TableContainer component={Paper} className='bangthongke' style={{width: '500px', height: '300px'}}>
                                                        <Table  aria-label="simple table">
                                                            <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center">ID</TableCell>
                                                                <TableCell align="center">Tên Thể Loại Sách</TableCell>
                                                                <TableCell align="center">Lượt mượn&nbsp;(quyển)</TableCell>
                                                                
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {dataTheoThoiGianTheLoaiSach.map((row) => (
                                                                <TableRow
                                                                key={row.id}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                <TableCell component="th" scope="row">
                                                                    {row.id}
                                                                </TableCell>
                                                                <TableCell align="left">{row.label}</TableCell>
                                                                <TableCell align="center">{row.value}</TableCell>
                                                                
                                                                </TableRow>
                                                            ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                    </div>
                                                    </>
                                                ): null
                                            
                                            }
                                        </div>
                                    </div>
                                )
                                }
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

export default TrangChuManager;