import express from "express";
import { getlistsach, gettentheloaisach } from "../controllers/sach.js";

const router = express.Router();

router.get('/', getlistsach);
router.get('/theloaisach', gettentheloaisach);


export default router;