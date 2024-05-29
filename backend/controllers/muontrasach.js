import db from '../db.js';

export const _dkimuonsach =async(req, res) =>{
    const {id_nguoimuon, masach, matheloaisach, thoihan, soluong, ngaydangki} = req.body;
    console.log("body:",req.body);
    db.query('INSERT INTO dkmuonsach(id_nguoimuon, masach, matheloaisach, thoihan, soluong, ngaydangki) VALUES($1, $2, $3, $4, $5)', [id_nguoimuon, masach, matheloaisach, thoihan, soluong, ngaydangki],
        (err, result) =>{
            if(err){
                console.log("Loi tai cau lenh sql roi");
                  //console.log( res.status(500).json(err))
                return res.status(500).json(err);
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