import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{

    //const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [listSach, setListSach] = useState(null);
    const [listTheLoaiSach, setListTheLoaiSach] = useState(null);
    const [selected, setSelected] = useState();
    
    
    const [inf, setInf] = useState(null);

    const login =  async (input) =>{
        const res = await axios.post("http://localhost:4000/api/auth/login", input);
        setCurrentUser(res.data);

        // thiết lập thời gian tồn tại của phiên đăng nhập
        const sessionTimeout = 3600000;

        // Lưu thời gian hết hạn của phiên đăng nhập vào localStorage
        const expirationTime = Date.now() + sessionTimeout;
        localStorage.setItem("expirationTime", expirationTime);
    };

    const an = async (input) =>{
        const res = await axios.post(`http://localhost:4000/api/${input}`,input);
        setInf(res.data);

    }


    const logout = async () =>{
        await axios.post("http://localhost:4000/api/auth/logout");
        setCurrentUser(null);
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("user");
        

    };

    useEffect(() =>{

        const fetchListSach = async () => {
            try {
              const response = await axios.get('http://localhost:4000/api/sach');
              setListSach(response.data);
            } catch (error) {
              console.error('Error fetching list of books:', error);
            }
          };
      
          fetchListSach();

        const fetchListTheLoaiSach = async () => {
            try {
              const response1 = await axios.get('http://localhost:4000/api/sach/theloaisach');
              setListTheLoaiSach(response1.data);
            } catch (error) {
              console.error('loi lay the loai sach', error);
            }
        };
      
        fetchListTheLoaiSach();
        
        localStorage.setItem("user", JSON.stringify(currentUser));

        const expirationTime = localStorage.getItem("expirationTime");

        //kiem tra xem phien dang nhap co het han chua
        if(expirationTime && Date.now() > Number(expirationTime)){
            //navigate('/login');
            logout();
            
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout,an , listSach, setListSach, listTheLoaiSach, setListTheLoaiSach, selected, setSelected}} >
            {children}
        </AuthContext.Provider>
    );
};