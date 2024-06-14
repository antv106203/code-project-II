import db from '../db.js';


export const _noibatthang = async(req, res) =>{
    console.log(req.body);
    db.query('SELECT s.tensach, SUM(m.soluong) AS tongsoluong FROM muontrasach m JOIN sach s ON m.masach = s.masach AND m.matheloaisach = s.matheloaisach   WHERE EXTRACT(MONTH FROM m.ngaymuon) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY s.tensach ORDER BY tongsoluong DESC LIMIT 5;', [], (err, results) =>{
        if(err){
            res.json("Lỗi");
        }
        else{
            // Thêm trường id
            const data = results.rows.map((item, index) => {
                return {
                    id: index + 1,
                    tensach: item.tensach,
                    luotmuon: Number(item.tongsoluong)
                };
            });
            res.json(data);
            console.log(data);
        }
    })
}

export const _noibatthangtheloai = async(req, res) =>{
    console.log(req.body);
    db.query('SELECT s.tentheloaisach, SUM(m.soluong) AS tongsoluong FROM muontrasach m JOIN sach s ON m.masach = s.masach AND m.matheloaisach = s.matheloaisach   WHERE EXTRACT(MONTH FROM m.ngaymuon) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY s.tentheloaisach ORDER BY tongsoluong DESC;', [], (err, results) =>{
        if(err){
            res.json("Lỗi");
        }
        else{
            // Thêm trường id
            const data = results.rows.map((item, index) => {
                return {
                    id: index + 1,
                    label: item.tentheloaisach,
                    value: Number(item.tongsoluong)
                };
            });
            res.json(data);
            //console.log(data);
        }
    })
}

export const thongkesosachtheothoigian = async(req, res) =>{
    //console.log(req.body);
    const {tungay, denngay} = req.body
    db.query('SELECT s.tensach, SUM(m.soluong) AS tongsoluong FROM muontrasach m JOIN sach s ON m.masach = s.masach AND m.matheloaisach = s.matheloaisach   WHERE $1 <= m.ngaymuon AND m.ngaymuon <= $2 GROUP BY s.tensach ORDER BY tongsoluong DESC;', [tungay, denngay], (err, results) =>{
        if(err){
            res.json("Lỗi");
        }
        else{
            // Thêm trường id
            const data = results.rows.map((item, index) => {
                return {
                    id: index + 1,
                    tensach: item.tensach,
                    luotmuon: Number(item.tongsoluong)
                };
            });
            res.json(data);
            //console.log(data);
        }
    })
}

export const thongketheloaitheothoigian = async(req, res) =>{
    const {tungay, denngay} = req.body
    db.query('SELECT s.tentheloaisach, SUM(m.soluong) AS tongsoluong FROM muontrasach m JOIN sach s ON m.masach = s.masach AND m.matheloaisach = s.matheloaisach   WHERE $1 <= m.ngaymuon AND m.ngaymuon <= $2 GROUP BY s.tentheloaisach ORDER BY tongsoluong DESC;', [tungay, denngay], (err, results) =>{
        if(err){
            res.json("Lỗi");
        }
        else{
            // Thêm trường id
            const data = results.rows.map((item, index) => {
                return {
                    id: index + 1,
                    label: item.tentheloaisach,
                    value: Number(item.tongsoluong)
                };
            });
            res.json(data);
            //console.log(data);
        }
    })
}

