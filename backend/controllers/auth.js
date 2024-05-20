import db from "../db.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { tendangnhap, matkhau} = req.body;

  try {
    //const query1 = 'SELECT * FROM users RIGHT JOIN roles ON roles."RoleId" = users."RoleId" WHERE "Email" = $1';
    const query = 'SELECT * FROM ACCOUNT WHERE tendangnhap = $1';
    const result = await db.query(query, [tendangnhap]);

    const data = result.rows;
    console.log(data);
    console.log("req.body:", req.body);
    if (data.length === 0) {
      return res.status(404).json({ message: "Không Tồn Tại Tài Khoản này" });
    }

    const user = data[0];
    // Check password
    if (matkhau!== user.matkhau) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu!" });
    }

    const token = jwt.sign({ id: user.idtaikhoan }, "jwtkey");
    const { matkhau: _, ...userData } = user; // Use destructuring to exclude the "password" property

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};


