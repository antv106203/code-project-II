import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{

    //const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );

    const [listSach, setListSach] = useState(null);
    const [listTheLoaiSach, setListTheLoaiSach] = useState(null);
    
    

    const login =  async (input) =>{
        const res = await axios.post("http://localhost:4000/api/auth/login", input);
        setCurrentUser(res.data);
    };


    const logout = async () =>{
        await axios.post("http://localhost:4000/api/auth/logout");
        setCurrentUser(null);
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
        
        sessionStorage.setItem("user", JSON.stringify(currentUser));

    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, listSach, setListSach, listTheLoaiSach, setListTheLoaiSach}} >
            {children}
        </AuthContext.Provider>
    );
};