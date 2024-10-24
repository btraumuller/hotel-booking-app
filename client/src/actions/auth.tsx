import axios from "axios";

type registerType = {
    name: string,
    email: string,
    password: string
}

type loginUserType = {
    email: string,
    password: string
}

type nextType = {
    (user:any):void
}

export const register = async (user:registerType) => {
    await axios.post(`${process.env.REACT_APP_Server_API}/register`, user);
}

export const login = async (user:loginUserType) => {
    console.log(user);
    await axios.post(`${process.env.REACT_APP_Server_API}/login`, user);
}

export const updateUserInLocalStorage = (user:any, next:nextType) => {
    if (window.localStorage.getItem('auth')){
        let auth = JSON.parse(window.localStorage.getItem('auth') || '{}');
        auth.user = user;
        window.localStorage.setItem('auth', JSON.stringify(auth));
        next(user);
    }
}