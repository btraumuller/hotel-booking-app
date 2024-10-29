import express from 'express';
import formidable from 'express-formidable';
import { addHotel } from "../controllers/hotel";
import { requireSignin } from '../middleware';
const router  = express.Router();

router.post('/add-hotel', requireSignin, formidable(), addHotel);

module.exports = router;