import axios from 'axios';

export const createConnectAccount = async (token:any) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/createConnectAccount`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAccountStatus = async (token:any) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/get-account-status`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}