
import axios from 'axios';

import { HotelQuery } from '../types/hotel';

export const addHotel = async (token: string, hotel:any)=> {
    try {
        return await axios.post(`${process.env.REACT_APP_Server_API}/add-hotel`, hotel, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
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

export const sellerHotels = async (token:string) => {
    try{
        return await axios.get(`${process.env.REACT_APP_Server_API}/seller-hotels`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const diffDays = (from: Date, to: Date) => {
    
    const day:number = 24*60*60*1000;
    const start:number = new Date(from).getTime();
    const end:number= new Date(to).getTime();
    const difference:number = Math.round(Math.abs((start - end) / day));

    return difference > 1 ? `${difference} days` : `${difference} day`;
}

export const deleteHotel = async (token:string, hotelId:string) => {
    try{
        return await axios.delete(`${process.env.REACT_APP_Server_API}/delete-hotel/${hotelId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }    
}

export const getHotel = async (hotelId:string) => {
    try{
        return await axios.get(`${process.env.REACT_APP_Server_API}/hotel/${hotelId}`);
    }catch(err){
        return err;
    }
}

export const updateHotel = async (token:string, hotelId:string) => {
    try{
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
    try{
        return await axios.get(`${process.env.REACT_APP_Server_API}/user-hotel-bookings`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const isAlreadyBooked = async (token:string, hotelId:string) => {
    try{
        return await axios.get(`${process.env.REACT_APP_Server_API}/is-already-booked/${hotelId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch(err){
        return err;
    }
}

export const searchListings = async (query:HotelQuery) => {
    
    try{
        console.log("query", query);
       return await axios.post(`${process.env.REACT_APP_Server_API}/search-listings`, query);
    }catch(err){
        return err;
    }
    
}