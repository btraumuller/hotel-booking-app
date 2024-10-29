import Hotel from "../models/hotel";
import fs from 'fs';

export const addHotel = async (req, res) => {
   
    let fields = req.fields;
    let files = req.files;
    let location = fields.location;
    let title = fields.title;
    let content = fields.content;
    let price = fields.price;
    let bed = fields.bed;
    let to = fields.to;
    let from = fields.from;

    if(!title){
        return res.status(400).send('Title is required');
    }
    if (!location){
        return res.status(400).send('Location is required');
    }
    if (!content){
        return res.status(400).send('Content is required');
    }
    if (!price){
        return res.status(400).send('Price is required');
    }
    if (!bed){
        return res.status(400).send('Bed is required');
    }
    if (!from){
        return res.status(400).send('From date is required');
    }
    if (!to){
        return res.status(400).send('To date is required');
    }
 
    let hotelExist = await Hotel.findOne({
        title: title,
        location: location,
    }).exec();

    if (hotelExist){
        return res.status(400).send('Hotel with that location already exists');
    }else{
    
        try{
            
            const hotel = new Hotel(fields);
            hotel.postedBy = req.user._id;
            
            if(files.image){
                hotel.image.data = fs.readFileSync(files.image.path);
                hotel.image.contentType = files.image.type;
            }

            await hotel.save((err, result) =>{
                if(err){
                    console.log('SAVE HOTEL ERROR', err);
                    return res.status(400).send('Error saving hotel. Try again.');
                }
                return res.json(result);
            });

        }catch{
            console.log('HOTEL CREATE ERROR', error);
            res.status(400).send('Hotel create failed. Try again.');
        }
    }  

    
}

export const getHotels = async (req, res) => {
    try{
        let all = await Hotel.find({}).limit(24).select("-image.data").populate('postedBy', '_id name').exec();
        res.json(all);
    }
    catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

export const image = async (req, res) => {

    let hotel = await Hotel.findById(req.params.hotelId).exec();
    
    if(hotel && hotel.image && hotel.image.data !== null){
        res.set('Content-Type', hotel.image.contentType);
        return res.send(hotel.image.data);
    }
}

export const getSellerHotels = async (req, res) => {
    let all = await Hotel.find({postedBy: req.user._id}).select("-image.data").populate('postedBy', '_id name').exec();
    res.send(all);
}