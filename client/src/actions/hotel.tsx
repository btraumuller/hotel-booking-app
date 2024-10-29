
import axios from 'axios';

export const addHotel = async (token:any, hotel:any) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/add-hotel`, hotel, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}