import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {LoadingOutlined} from '@ant-design/icons';
export default function StripeSuccess({match, history}:any) {
    const {auth} = useSelector((state:any) => ({...state}));

    useEffect(() => {
        console.log('hey');
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
                history.go('/dashboard');
            }else{
                history.go('/stripe/cancel');
            }
            
        });
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