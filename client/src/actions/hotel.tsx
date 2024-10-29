
import axios from 'axios';

export const addHotel = async (token:any, hotel:any) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/add-hotel`, hotel, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const allHotels = async () => {
    await axios.get(`${process.env.REACT_APP_Server_API}/all-hotels`);
}

export const sellerHotels = async (token:any) => {
    await axios.get(`${process.env.REACT_APP_Server_API}/seller-hotels`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const diffDays = (from: Date, to: Date) => {
    
    const day:number = 24*60*60*1000;
    const start:number = new Date(from).getTime();
    const end:number= new Date(to).getTime();
    const difference:number = Math.round(Math.abs((start - end) / day));

    return difference > 1 ? `${difference} days` : `${difference} day`;
}