import express from "express";
import { _dkimuonsach, _damuon, _dapheduyet, _chopheduyet,_dangchopheduyet, _pheduyet, _dapheduyet_staff, _xoakhoibangpheduyet, _muonsach, _dangmuon_staff, _trasach, _datra_staff} from "../controllers/muontrasach.js";


const router = express.Router();
router.post('/dkimuonsach', _dkimuonsach)
router.post('/dkimuonsach/damuon', _damuon)
router.post('/dkimuonsach/dapheduyet', _dapheduyet)
router.post('/dkimuonsach/chopheduyet', _chopheduyet)
router.get('/dkimuonsach/dangchopheduyet',_dangchopheduyet)
router.get('/dkimuonsach/dapheduyet_staff', _dapheduyet_staff)
router.get('/dkimuonsach/dangmuon_staff', _dangmuon_staff)
router.get('/dkimuonsach/datra_staff', _datra_staff)
router.put('/dkimuonsach/pheduyet', _pheduyet)
router.put('/muonsach/tra', _trasach)
router.post('/dkimuonsach/xoakhoibangpheduyet',_xoakhoibangpheduyet)
router.post('/muonsach/muon',_muonsach)
export default router;