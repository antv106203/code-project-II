import { useState } from 'react';
import './TrangChuStaff.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth_Context';
const TrangChuStaff = () =>{

    const [click, setClick] = useState('Sách');
    const handleItemClick = (item) => {
        setClick(item);
    };
    const {listSach, listTheLoaiSach, currentUser, selected, setSelected,logout} = useContext(AuthContext);
    const [type, setType] = useState(null);
    const [dsSach, setDsSach] = useState(listSach);
    return(
            <div className='trangchustaff'>
                <div className='navbar'>
                    <div
                    className={`danhmuc-item ${click === 'Sách' ? 'active' : ''}`}
                    onClick={() => handleItemClick('Sách')}
                    >
                    Sách
                    </div>
                    <div
                    className={`danhmuc-item ${click === 'Mượn trả sách' ? 'active' : ''}`}
                    onClick={() => handleItemClick('Mượn trả sách')}
                    >
                    Mượn trả sách
                    </div>
                    <div
                    className={`danhmuc-item ${click === 'Tài Khoản' ? 'active' : ''}`}
                    onClick={() => handleItemClick('Tài Khoản')}
                    >
                    Tài Khoản
                    </div>
                </div>

                <div className='center'>
                    abc
                </div>
            
            </div>
    )
}

export default TrangChuStaff;