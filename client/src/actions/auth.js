import axios from "axios";

export const register = async (user) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/register`, user);
}

export const login = async (user) => {
    console.log(user);
    await axios.post(`${process.env.REACT_APP_Server_API}/login`, user);
}