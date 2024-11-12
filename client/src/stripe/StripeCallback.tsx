import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInLocalStorage } from '../actions/auth';

const StripeCallback = ({history}:any) => {
    const {auth} = useSelector((state:any) => ({...state}));
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const accountStatus = async () => {
            
            try {
                const res = await axios.post(`${process.env.REACT_APP_Server_API}/get-account-status`, {}, {
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                //console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK",res);
                updateUserInLocalStorage(res.data, ()=>{
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: res.data
                    });
                    window.localStorage.setItem('auth', JSON.stringify(res.data));
                    history.go('/dashboard/sellers');
                });

            } catch (error) {
                console.log(error);
            }
        }

        if (auth && auth.token) {
            accountStatus();
        }
    }, [auth]);
    
    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 text-danger p-5"/>
        </div>
    )
}

export default StripeCallback;