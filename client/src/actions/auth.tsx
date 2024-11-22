import axios from "axios";
import { registerType, LoginUser, NextType } from "../types/auth";
import { UserObject } from "../types/global";


export const register = async (user:registerType) => {
    try{
        return  await axios.post(`${process.env.REACT_APP_Server_API}/register`, user);
    }catch(err){
        return err;
    }
}

export const login = async (user:LoginUser) => {
    try{
      return await axios.post(`${process.env.REACT_APP_Server_API}/login`, user);
    }catch(err){
        return err;
    }
    
}

export const updateUserInLocalStorage = (user:UserObject, next:NextType) => {
    if (window.localStorage.getItem('auth')){
        let auth = JSON.parse(window.localStorage.getItem('auth') || '{}');
        auth.user = user;
        window.localStorage.setItem('auth', JSON.stringify(auth));
        next(user);
    }
}