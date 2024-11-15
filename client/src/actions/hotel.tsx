
import axios from 'axios';

export const addHotel = async (token:string, hotel:any) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/add-hotel`, hotel, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const allHotels = async () => {
    try{
        return await axios.get(`${process.env.REACT_APP_Server_API}/all-hotels`);
    }catch(err){
        return err;
    }
}

export const sellerHotels = async () => {
    await axios.get(`${process.env.REACT_APP_Server_API}/seller-hotels`);
}

export const diffDays = (from: Date, to: Date) => {
    
    const day:number = 24*60*60*1000;
    const start:number = new Date(from).getTime();
    const end:number= new Date(to).getTime();
    const difference:number = Math.round(Math.abs((start - end) / day));

    return difference > 1 ? `${difference} days` : `${difference} day`;
}

export const deleteHotel = async (token:string, hotelId:string) => {
    await axios.delete(`${process.env.REACT_APP_Server_API}/delete-hotel/${hotelId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const getHotel = async (hotelId:string) => {
    await axios.get(`${process.env.REACT_APP_Server_API}/hotel/${hotelId}`);
}

export const updateHotel = async (token:string, hotelId:string) => {
    try{
        console.log(hotelId);
        return await axios.post(`${process.env.REACT_APP_Server_API}/update-hotel`, hotelId, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const loadSellerHotel = async (token:string, hotelId:string) => {
    try{
        return await axios.get(`${process.env.REACT_APP_Server_API}/hotel/${hotelId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const userHotelBookings = async (token:string) => {
    await axios.get(`${process.env.REACT_APP_Server_API}/user-hotel-bookings`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const isAlreadyBooked = async (token:string, hotelId:string) => {
    await axios.get(`${process.env.REACT_APP_Server_API}/is-already-booked/${hotelId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const searchListings = async (query:any) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/search-listings`, query);
}