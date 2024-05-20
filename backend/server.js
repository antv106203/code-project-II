import express from "express";
import cors from 'cors';


const port = 4000;
const app = express();
app.use(express.json());
app.use(cors())
// app.get("/" , async(req,res) =>{
//     const result = await db.query("SELECT * FROM ACCOUNT");
//     res.send(result.rows[0]);
// })

import  authRoutes from './routes/auth.js';
app.use("/api/auth", authRoutes);

import userRoutes from './routes/users.js';
import db from "./db.js";
app.use("/api/users", userRoutes);

import sachRoutes from './routes/sach.js';
app.use("/api/sach", sachRoutes);

import muontrasachRoutes from './routes/muontrasach.js'
app.use("/api/muontrasach",muontrasachRoutes);

app.get("/api/v1/taikhoan", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM ACCOUNT");
    console.log("database:",result.rows);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, (req,res) => {
  console.log("Connected!");
});







