import express from 'express';
import formidable from 'express-formidable';
import { 
    addHotel, 
    getHotels, 
    getHotel, 
    image, 
    getSellerHotels, 
    deleteHotel, 
    updateHotel,
    userHotelBookings,
    isAlreadyBooked,
    searchListings 
} from "../controllers/hotel";
import { requireSignin, hotelOwner  } from '../middleware';

const router  = express.Router();

router.post('/add-hotel', requireSignin, formidable(), addHotel);

router.get('/all-hotels', getHotels);

router.get('/hotel/image/:hotelId', image);

router.get('/seller-hotels', requireSignin, getSellerHotels);

router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, deleteHotel);

router.get('/hotel/:hotelId', getHotel);

router.put('/update-hotel', requireSignin, formidable(), updateHotel);

router.get('/user-hotel-bookings', requireSignin, userHotelBookings);

router.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked);

router.post('/search-listings', searchListings);

module.exports = router;