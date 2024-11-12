import axios from 'axios';

export const createConnectAccount = async (token:string) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/create-connect-account`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAccountStatus = async (token:string) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/get-account-status`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const currencyFormatter = (data:any) => {
    return (data.amount/100).toLocaleString(data.currency, {
        style: 'currency',
        currency: data.currency
    });
}

export const payoutSetting = async (token:string) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/payout-setting`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const getSessionId = async (token:string, hotelId:string) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/stripe-session-id`, {hotelId}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const stripeSuccessRequest = async (token:string, hotelId:string) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/stripe-success`, {hotelId}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}