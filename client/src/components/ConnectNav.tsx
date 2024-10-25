import { useSelector } from "react-redux";
import {Card, Avatar, Badge} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../actions/stripe";

const {Ribbon} = Badge;

function ConnectNav() {
    const [balance, setBalance] = useState<{ pending?: { currency: string, amount: number }[] }>({});
    const [loading, setLoading] = useState(false);
    const {auth} = useSelector((state:any) => ({...state}));
    const {user} = auth;
    const compareDays = () => {

        let today:any = new Date();
        let createdAt:any = new Date(user.createdAt);
        const diff:number = today - createdAt;
        const days:number = diff/(1000*60*60*24);
    
        return Math.round(days) > 1 ? `${Math.round(days)} days` : `${Math.round(days)} day`;
    }

    const handlePayoutSettings = async () => {
        setLoading(true);
        try{
            let res = await axios.get(`${process.env.REACT_APP_Server_API}/payout-settings`, {
                headers:{
                    Authorization: `Bearer ${auth.token}`
                }
            });
            window.location.href=res.data.url;
            setLoading(false);
        }catch(error){
            console.log(error);
            toast.error('Unable to access settings. Try again.');
            setLoading(false);
        }
    }
    useEffect(() => {

        const getAccountBalance = async () => {
            try{
                let balance = await axios.post(`${process.env.REACT_APP_Server_API}/get-account-balance`, {}, {
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setBalance(balance.data);
            }catch(error){
                console.log(error);
            }  
        }

        getAccountBalance();

    }, [auth.token]);
    
    return (
        <>
        <div className="d-flex justify-content-around">
            <Card>
                <Card.Meta title={user.name} description={`Joined ${(compareDays())} ago`} avatar={<Avatar>{user.name[0]}</Avatar>} />
            </Card>
        </div>
        {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && 
            <>
                <Ribbon text="Available" color="grey">
                    <Card>
                        {balance && balance.pending && 
                            
                            balance.pending.map((ba,i) =>{
                                return (
                                    <span key={i} className="lead">{currencyFormatter(ba)}</span>
                                )
                            })
                        }
                    </Card>
                </Ribbon>
                <Ribbon text="Payouts" color="silver" className="bg-light pointer">
                    <SettingOutlined disabled={loading} onClick={handlePayoutSettings} className="h5 pt-2" />
                </Ribbon>
            </>
        }
        </>
    )
}
export default ConnectNav;