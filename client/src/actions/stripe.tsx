import axios from 'axios';
import { CurrencyObject } from '../types/global';
export const createConnectAccount = async (token:string) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/create-connect-account`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const getAccountStatus = async (token:string) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/get-account-status`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const getAccountBalance = async (token:string) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/get-account-balance`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}

export const currencyFormatter = (data: CurrencyObject) => {
    return (data.amount/100).toLocaleString(data.currency, {
        style: 'currency',
        currency: data.currency
    });
}

export const payoutSetting = async (token:string) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/payout-setting`, {}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }  
}

export const getSessionId = async (token:string, hotelId:string) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/stripe-session-id`, {hotelId}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch(err){
        return err;
    }
}

export const stripeSuccessRequest = async (token:string, hotelId:string) => {
    try{
        return await axios.post(`${process.env.REACT_APP_Server_API}/stripe-success`, {hotelId}, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
    }catch(err){
        return err;
    }
}