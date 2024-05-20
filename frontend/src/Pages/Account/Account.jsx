
import axios from 'axios';
import { useState } from 'react';
import { useEffect,useMemo } from 'react';
import { Button, Flex } from '@mantine/core';
import FormS from './Form';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import './Account.css';
import {useNavigate} from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import FormChiTiet from './Form/FormChiTiet';

import {
    MRT_GlobalFilterTextInput,
    MRT_ToggleFiltersButton,
    MantineReactTable,
    useMantineReactTable,
} 
from "mantine-react-table"
import FormSuaThongTin from './Form/FormSuaThongTin';
const Account = () =>{
    const navigate = useNavigate();

    const [listTaiKhoan, setListTaiKhoan] = useState('');
    const [popupSua,setPopupSua] = useState(false);
    const [popupThem,setPopupThem] = useState(false);
    const [popupChiTiet,setPopupChiTiet] = useState(false);
    const [data, setData] = useState();
    const [listDetail,setListDetail] = useState({})

    const onClickDetail =  async (data) =>{
      const {idtaikhoan} = data;
      const response = await axios.post('http://localhost:4000/api/users/detail', {idtaikhoan})
      console.log(response.data);
      setListDetail(response.data);
      setPopupChiTiet(true);
      console.log(popupChiTiet);
    }

    const onClickSua =  async (data) =>{
      const {idtaikhoan} = data;
      const response = await axios.post('http://localhost:4000/api/users/detail', {idtaikhoan})
      console.log(response.data);
      setListDetail(response.data);
      setPopupSua(true);
      console.log(popupSua);
    }

    

    const onClickXoa = async (table) => {
    let rows = table.getSelectedRowModel().flatRows
    
    if(window.confirm('Xác nhận xóa!')) {
      var ids = [];
      let data = listTaiKhoan;

      for(let row of rows) {
          ids = [...ids,row.original.idtaikhoan];
          data = data.filter((obj) => obj.idtaikhoan !== row.original.idtaikhoan);
      }
      setListTaiKhoan(data)
      await axios.post('http://localhost:4000/api/users/delete',ids);
      table.toggleAllRowsSelected(false)
      alert('Đã xóa');
    }
    else table.toggleAllRowsSelected(false)
  }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:4000/api/users/get', []); 
            setListTaiKhoan(response.data)
            //console.log(listTaiKhoan);    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

      console.log("chi tiet:", listDetail);

      

      const columns = useMemo(
            () => [
            {   
                accessorKey:'idtaikhoan',
                header:'ID',
            },
            {   
                accessorKey:'tendangnhap',
                header:'Tên Đăng Nhập',
            },
            {
                accessorKey:'matkhau',
                header:'Mật khẩu',
            },
            {
                accessorKey:'vaitro',
                header:'Vai trò',
                enableGrouping: false,
            },

            {
              header: 'action',
              Cell: ({ row }) => (
                <div style = {{display:'flex'}}>
                  <div className='w-100 ps-2'><DriveFileRenameOutlineIcon className='anbutton'  onClick = {()=>onClickSua(row.original)}/></div>
                  <div className='w-100 ps-2'><InfoIcon className='anbutton' onClick = {()=>onClickDetail(row.original)}/></div>
                </div>
              ),
            }
            ], [],
        );

    const table = useMantineReactTable({
    columns,
    data:listTaiKhoan, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableStickyHeader: true, // static header
    enablePinning: true,
    enableGrouping: true,
    enableRowActions: true,
    enableRowSelection: (row) => row.original.idtaikhoan > 0,
    positionToolbarAlertBanner: 'bottom',
    paginationDisplayMode: 'pages',
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    mantineTableContainerProps: {
      sx: { 
        maxHeight: '70vh',
        width: '100%'
      },
    },
    mantineSearchTextInputProps: {
      placeholder: 'Tìm Kiếm',
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Action',
        size: 50,
      },
    },
    renderRowActions: ({row}) => (
      <div className='w-100 ps-2'>
        </div>
    ),
    
    renderTopToolbar: ({ table }) => {
      return (
        <Flex p="md" justify="space-between" >
          <Flex gap='8px'>
            <Button color="green" onClick={()=>{navigate("/account/Them")}}
              disabled={(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
            >Thêm</Button>

            <Button color="red" variant="filled" onClick={()=>onClickXoa(table)}
              disabled={!(table.getIsSomeRowsSelected()||table.getIsAllRowsSelected())}
            >Xóa</Button>
          </Flex>
          <Flex gap= '8px'>
            <MRT_ToggleFiltersButton table={table} />
            <MRT_GlobalFilterTextInput table={table} />
          </Flex>
        </Flex>
        );
      }
      
    });
    
    return(
        
        <div style={{padding: 10}}>
            <MantineReactTable table={table} />
              {popupSua?<FormSuaThongTin data={listDetail} close={()=>setPopupSua(false)} handleClickSua={onClickSua} />:<></>}
              {popupChiTiet?<FormChiTiet data = {listDetail} close = {()=>setPopupChiTiet(false)}/>:<></>}
        </div>
        
    )
}

export default Account;