import {expressjwt} from 'express-jwt';
import Hotel from '../models/hotel';

export const requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]  // this algorithm is used to decode the token   
});

export const hotelOwner = async (req, res, next) => {
    let hotel = await Hotel.findById(req.params.hotelId).exec();
    let owner = hotel.postedBy._id.toString() === req.auth._id.toString();
    if (!owner) {
        return res.status(403).send("Unauthorized");
    }
    next();
}