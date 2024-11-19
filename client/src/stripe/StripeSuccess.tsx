import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {LoadingOutlined} from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { matchParams } from "../types/global";
import { userObject } from "../types/global";

export default function StripeSuccess(match:matchParams) {
    const {auth} = useSelector((state:userObject) => ({...state}));
    const history = useHistory();
    let init:React.MutableRefObject<boolean> = useRef(true);
    
    useEffect(() => {
        if (init.current){

            const stripeSuccessRequest = async (token:string, hotelId:string) => {
                return await axios.post(`${process.env.REACT_APP_Server_API}/stripe-success`, {hotelId}, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
            }
    
            stripeSuccessRequest(auth.token, match.params.hotelid).then((res) => {
                console.log("ORDER",res);
                if (res.data.success){
                    history.push('/dashboard');
                }else{
                    history.push('/stripe/cancel');
                }
                
            });
            
            init.current = false;
        }

    },[auth.token, match.params.hotelid, history]);
    return (
        <div className="container">
            <div className="d-flex justify-content-center p-5">
                Test
                <LoadingOutlined className="display-1 text-danger p-5"/>
            </div>
        </div>
    );
}