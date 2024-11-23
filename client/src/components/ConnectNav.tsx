import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {Card, Avatar, Badge} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import { currencyFormatter, payoutSetting, getAccountBalance } from "../actions/stripe";
import { diffDays } from "../actions/hotel";
import { UserObject } from "../types/global";
import { useAuth } from "../selectors/auth";
import {AccountStatusResponse, PaymentSettingResponse} from "../types/stripe";
const {Ribbon} = Badge;

function ConnectNav() {
    const [balance, setBalance] = useState<{ pending?: { currency: string, amount: number }[] }>({});
    const [loading, setLoading] = useState(false);

    // const getAuth = (state:UserObject) => state;

    // const storedAuth = createSelector(getAuth, (state) => ({...state}));

    // const {auth} = useSelector(storedAuth);

    const {user} = useAuth();
    const {token} = useAuth();

    const handlePayoutSettings = async () => {
        setLoading(true);
        try{
            let res = await payoutSetting(token);

            if (!res){
                throw new Error('Unable to access settings');
            }
            
            window.location.href=(res as PaymentSettingResponse).data.url;

            setLoading(false);
            
        }catch(error:any){
            console.log("Error", error.message);
            toast.error('Unable to access settings. Try again.');
            setLoading(false);
        }
    }

    useEffect(() => {

            getAccountBalance(token).then((balance) => {
                
                if (!balance){
                    throw new Error('Balance is not available');
                }

                setBalance((balance as AccountStatusResponse).data);

            }).catch((error:any) => {
                console.log(error);
            }) ;

    }, [token]);
    
    return (
        <div className="d-flex container-xxl justify-content-around">
            <Card>
                <Card.Meta title={user.name} description={`Joined ${(diffDays(new Date(), new Date(user.createdAt)))} ago`} avatar={<Avatar>{user.name[0]}</Avatar>} />
            </Card>
        
        {user && user.stripe_seller && user.stripe_seller.charges_enabled && 
            <>
                <Ribbon text="Available" color="grey" className="d-flex">
                    <Card className="p-2">
                        {balance && balance.pending && 
                            
                            balance.pending.map((ba,i) =>{
                                return (
                                    <span key={i} className="lead">{currencyFormatter(ba)}</span>
                                )
                            })
                        }
                    </Card>
                </Ribbon>
                <Ribbon text="Payout Settings" color="silver" className="pointer d-flex">
                    <Card className="p-2">
                        <SettingOutlined disabled={loading} onClick={handlePayoutSettings} className="h4 pt-3" />
                    </Card>
                </Ribbon>
            </>
        }
        </div>
    )
}
export default ConnectNav;