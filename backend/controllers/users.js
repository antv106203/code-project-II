import db from '../db.js';

export const _create = (req, res) =>{
    const {idtaikhoan,tendangnhap, matkhau, vaitro,hovaten,ngaysinh,chucvu,sodienthoai,gioitinh, diachi, quequan,email, ngaycap,ngayhethan,socccd} = req.body;
    //const socccdValue = socccd ? socccd : null;
    //const diemtruValue = diemtru ? diemtru : null;
    console.log(req.body)
    db.query("INSERT INTO account(tendangnhap, matkhau, vaitro,hovaten,ngaysinh,socccd,chucvu,sodienthoai,gioitinh, diachi, quequan,email, ngaycap,ngayhethan) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)"
            ,[tendangnhap, matkhau, vaitro, hovaten, ngaysinh,socccd,chucvu,sodienthoai,gioitinh,diachi,quequan,email,ngaycap,ngayhethan],
            (err,result) =>{
                if (err) {
                  console.log("Loi tai cau lenh sql roi");
                  //console.log( res.status(500).json(err))
                  return res.status(500).json(err);
                }
                    else{
                      console.log("Da nhan")
                      console.log(res);
                      return res.json("Thành công");
                    }
                }
        );
};

export const _read = (req,res) =>{
    
    console.log(req.body.length)
    const data = db.query(
        'SELECT * FROM account where $1 = 0',
        [req.body.length],
        (error, results) => {
          if (error) res.status(500).send("Lỗi server");
          else {res.json(results.rows);
                console.log("database:",results.rows);
          }
        }
      );

    
}


export const _update = (req, res) =>{
    const {idtaikhoan,tendangnhap, matkhau, vaitro,hovaten,ngaysinh,chucvu,sodienthoai,gioitinh, diachi, quequan,email, ngaycap,ngayhethan,socccd,diemtru} = req.body;
    console.log(req.body)
    db.query("UPDATE account SET  matkhau = $1 , hovaten = $2, ngaysinh = $3, socccd = $4, sodienthoai = $5, gioitinh = $6, diachi =$7 , quequan =$8, email = $9 WHERE idtaikhoan =$10",
    [matkhau,hovaten,ngaysinh,socccd,sodienthoai, gioitinh, diachi, quequan, email, idtaikhoan],
    (error, results) => {
        if (error) res.status(500).send("Lỗi server");
        else {
          console.log("da nhan cap nhat tai khoan tu client");
          console.log("Tai khoan da cap nhat:", results.rows);
          res.json("Cập nhật tài khoản thành công");
        }
      }
    )
}

export const _delete = (req, res) =>{
    const {idtaikhoan} = req.body;
    console.log(req.body);
    db.query("DELETE FROM account WHERE idtaikhoan = $1",[idtaikhoan],
      (error,result) =>{
        if(error) res.status(500).send("Lỗi server")
        else res.send("Thành công");
      }
    )
}

export const _getbyidtaikhoan = (req,res) =>{
  const {idtaikhoan} = req.body;
  console.log(req.body);
  db.query("SELECT * FROM account WHERE idtaikhoan = $1",[idtaikhoan],
  (error,results) =>{
    if(error) res.status(500).send("Lỗi server");
    else {
      console.log("da nhan thay post roi nhe");
      const dl = results.rows;
      console.log(dl);
      res.json(dl);
    }
  }
  )
}

