import express from 'express';
import formidable from 'express-formidable';
import { addHotel, getHotels, image, getSellerHotels } from "../controllers/hotel";
import { requireSignin } from '../middleware';
const router  = express.Router();

router.post('/add-hotel', requireSignin, formidable(), addHotel);

router.get('/all-hotels', getHotels);

router.get('/hotel/image/:hotelId', image);

router.get('/seller-hotels', requireSignin, getSellerHotels);

module.exports = router;