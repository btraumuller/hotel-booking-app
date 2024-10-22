import axios from 'axios';

export const createConnectAccount = async (token) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/createConnectAccount`, {}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}