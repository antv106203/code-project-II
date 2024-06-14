import express from "express";

import { _noibatthang, _noibatthangtheloai, thongkesosachtheothoigian, thongketheloaitheothoigian} from "../controllers/thongke.js";

const router = express.Router();
router.get('/noibatthang', _noibatthang);
router.get('/noibatthangtheloai', _noibatthangtheloai);
router.post('/thongkesoluotmuonsachtheothoigian', thongkesosachtheothoigian);
router.post('/thongkesotheloaisachtheothoigian', thongketheloaitheothoigian);

export default router