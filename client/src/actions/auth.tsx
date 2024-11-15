import axios from "axios";
import { registerType, loginUser, nextType } from "../types/auth";


export const register = async (user:registerType) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/register`, user);
}

export const login = async (user:loginUser) => {
    try{
      return await axios.post(`${process.env.REACT_APP_Server_API}/login`, user);
    }catch(err){
        return err;
    }
    
}

export const updateUserInLocalStorage = (user:any, next:nextType) => {
    if (window.localStorage.getItem('auth')){
        let auth = JSON.parse(window.localStorage.getItem('auth') || '{}');
        auth.user = user;
        window.localStorage.setItem('auth', JSON.stringify(auth));
        next(user);
    }
}