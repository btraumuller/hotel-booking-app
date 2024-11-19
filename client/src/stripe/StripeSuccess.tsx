import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {LoadingOutlined} from '@ant-design/icons';
import { stripeSuccessRequest } from "../actions/stripe";
import { matchParams } from "../types/global";
import { userObject } from "../types/global";
import { paymentSuccess } from "../types/stripe";


export default function StripeSuccess({match}:matchParams) {
    const {auth} = useSelector((state:userObject) => ({...state}));
    const history = useHistory();
    let init:React.MutableRefObject<boolean> = useRef(true);

    useEffect(() => {
        if (init.current){

            stripeSuccessRequest(auth.token, match.params.hotelid).then((res) => {

                if ((res as paymentSuccess).data.success){
                    history.push('/dashboard');
                    toast.success('Payment Success. Hotel booking is confirmed');
                }else{
                    history.push('/stripe/cancel');
                }
                
            }).catch((error:any) => {
                console.log("STRIPE SUCCESS ERR",error);
                toast.error('Payment failed. Try again.');
                history.push('/stripe/cancel');
            });
            
            init.current = false;
        }

    },[auth.token, match.params.hotelid, history]);
    return (
        <div className="container">
            <div className="d-flex justify-content-center p-5">
                <LoadingOutlined className="display-1 text-danger p-5"/>
            </div>
        </div>
    );
}