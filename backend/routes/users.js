import express from 'express';

import {_create, _read, _update, _delete,_getbyidtaikhoan} from '../controllers/users.js';

const router = express.Router();

router.post("/", _create);
router.post("/get", _read)
router.post("/put", _update);
router.post("/delete", _delete);
router.post("/detail",_getbyidtaikhoan);

export default router;

