import express from "express";
import { _dkimuonsach, _damuon, _dapheduyet, _chopheduyet } from "../controllers/muontrasach.js";


const router = express.Router();
router.post('/dkimuonsach', _dkimuonsach)
router.post('/dkimuonsach/damuon', _damuon)
router.post('/dkimuonsach/dapheduyet', _dapheduyet)
router.post('/dkimuonsach/chopheduyet', _chopheduyet)
export default router;