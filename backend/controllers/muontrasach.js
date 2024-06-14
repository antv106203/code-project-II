import db from '../db.js';

export const _dkimuonsach =async(req, res) =>{
    const {id_nguoimuon, masach, matheloaisach, thoihan, soluong, ngaydangki} = req.body;
    console.log("body:",req.body);
    db.query('INSERT INTO dkmuonsach(id_nguoimuon, masach, matheloaisach, thoihan, soluong, ngaydangki) VALUES($1, $2, $3, $4, $5,$6)', [id_nguoimuon, masach, matheloaisach, thoihan, soluong, ngaydangki],
        (err, result) =>{
            if(err){
                console.log("Loi tai them bang dang ki muon");
                  //console.log( res.status(500).json(err))
                return res.json("thất bại");
            }
            else{
                console.log("Da nhan")
                //console.log(res);
                return res.json("Thành công");
            }
        }
    )
}

export const _damuon = async(req, res) =>{
    console.log("req:",req.body);
    const {id_nguoimuon} = req.body;
    db.query('select * from muontrasach mts, sach s where id_nguoimuon = $1 and mts.masach = s.masach and mts.matheloaisach = s.matheloaisach ', [id_nguoimuon],
        (err, result) =>{
            if(err){
                console.log("loi sql roi")
                return res.json("Thất bại")
            }

            else{
                console.log("body:", req.body)
                console.log("ket qua tra ra:" , result.rows)
                return res.json(result.rows)
            }
        }
    )
}

export const _dapheduyet = async(req, res) =>{
    const {id_nguoimuon} = req.body;
    db.query('select * from dkmuonsach dkms, sach s where id_nguoimuon = $1 and dapheduyet = true and dkms.masach = s.masach and dkms.matheloaisach = s.matheloaisach ', [id_nguoimuon],
        (err, result) =>{
            if(err){
                console.log("loi sql roi")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json(result.rows)
            }
        }
    )
}

export const _chopheduyet = async(req, res) =>{
    const {id_nguoimuon} = req.body;
    db.query('select * from dkmuonsach dkms, sach s where id_nguoimuon = $1 and dapheduyet = false and dkms.masach = s.masach and dkms.matheloaisach = s.matheloaisach ', [id_nguoimuon],
        (err, result) =>{
            if(err){
                console.log("loi sql roi")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json(result.rows)
            }
        }
    )
}

export const _xoakhoibangpheduyet = async(req, res) =>{
    const {stt} = req.body;
    db.query('DELETE FROM dkmuonsach WHERE stt = $1', [stt],
        (err, result) =>{
            if(err){
                console.log("loi o xoa bang phe duyet")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json("Thành công")
            }
        }
    )
}

export const _dangchopheduyet = async(req, res) =>{
    //const {id_nguoimuon} = req.body;
    db.query('select * from account a, dkmuonsach d, sach s  where a.idtaikhoan = d.id_nguoimuon and d.matheloaisach =s.matheloaisach and d.masach = s.masach  and d.dapheduyet = false',[],
        (err, result) =>{
            if(err){
                console.log("loi sql roi")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json(result.rows)
            }
        }
    )
}

export const _dapheduyet_staff = async(req, res) =>{
    //const {id_nguoimuon} = req.body;
    db.query('select * from account a, dkmuonsach d, sach s  where a.idtaikhoan = d.id_nguoimuon and d.matheloaisach =s.matheloaisach and d.masach = s.masach  and d.dapheduyet = true',[],
        (err, result) =>{
            if(err){
                console.log("loi sql roi")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json(result.rows)
            }
        }
    )
}

export const _dangmuon_staff = async(req, res) =>{
    //const {id_nguoimuon} = req.body;
    db.query('select m.*,s.*, a1.idtaikhoan as idnguoimuon ,a1.hovaten as hotennguoimuon,a1.email as emailnguoimuon, a1.sodienthoai as sodienthoainguoimuon,a2.idtaikhoan as idnhanvien, a2.hovaten as hovatennhanvien, a2.email as emailnhanvien, a2.sodienthoai as sodienthoainhanvien from muontrasach m , account a1, account a2, sach s where m.id_nguoimuon = a1.idtaikhoan and m.id_nhanvien = a2.idtaikhoan and m.masach = s.masach and m.matheloaisach = s.matheloaisach and m.datra = false',[],
        (err, result) =>{
            if(err){
                console.log("Loi o dangmuon_staff")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json(result.rows)
            }
        }
    )
}

export const _datra_staff = async(req, res) =>{
    //const {id_nguoimuon} = req.body;
    db.query('select m.*,s.*, a1.idtaikhoan as idnguoimuon ,a1.hovaten as hotennguoimuon,a1.email as emailnguoimuon, a1.sodienthoai as sodienthoainguoimuon,a2.idtaikhoan as idnhanvien, a2.hovaten as hovatennhanvien, a2.email as emailnhanvien, a2.sodienthoai as sodienthoainhanvien from muontrasach m , account a1, account a2, sach s where m.id_nguoimuon = a1.idtaikhoan and m.id_nhanvien = a2.idtaikhoan and m.masach = s.masach and m.matheloaisach = s.matheloaisach and m.datra = true',[],
        (err, result) =>{
            if(err){
                console.log("Loi o datra_staff")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json(result.rows)
            }
        }
    )
}

export const _pheduyet = async(req, res) =>{
    const {id_nguoipheduyet,dongy, stt} = req.body;
    console.log(req.body);
    db.query('UPDATE dkmuonsach SET id_nguoipheduyet = $1, dongy = $2, dapheduyet = true where stt = $3',[id_nguoipheduyet, dongy, stt],
        (err, result) =>{
            if(err){
                console.log("loi sql roi")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json("Thành công");
            }
        }
    )
}


export const _trasach = async(req, res) =>{
    const {datra, tinhtrangsachkhitra, ngaytra, maphieu} = req.body;
    console.log(req.body);
    db.query('UPDATE muontrasach SET ngaytra = $1, tinhtrangsachkhitra = $2, datra = $3 where maphieu= $4',[ngaytra, tinhtrangsachkhitra, datra, maphieu],
        (err, result) =>{
            if(err){
                console.log("loi p tra sach")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json("Thành công");
            }
        }
    )
}

export const _muonsach = async(req, res) =>{
    const {id_nguoimuon, id_nhanvien,masach, matheloaisach, ngaymuon, ngaytradukien, tinhtrangsachkhimuon, ngaydkimuon, soluong} = req.body;
    console.log(req.body);
    db.query('INSERT INTO muontrasach(id_nguoimuon,id_nhanvien,masach,matheloaisach, ngaymuon,ngaytradukien,tinhtrangsachkhimuon,ngaydkimuon,soluong) VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9)',[id_nguoimuon, id_nhanvien,masach, matheloaisach, ngaymuon,ngaytradukien,tinhtrangsachkhimuon,ngaydkimuon, soluong],
        (err, result) =>{
            if(err){
                console.log("loi them bang muontrasach")
                return res.json("Thất bại")
            }

            else{
                console.log("da nhan");
                console.log(res);
                return res.json("Thành công");
            }
        }
    )
}