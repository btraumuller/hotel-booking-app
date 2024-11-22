import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import {Card, Avatar, Badge} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import { currencyFormatter, payoutSetting, getAccountStatus } from "../actions/stripe";
import { diffDays } from "../actions/hotel";
import { userObject } from "../types/global";
import {accountStatusResponse, paymentSettingResponse} from "../types/stripe";
const {Ribbon} = Badge;

function ConnectNav() {
    const [balance, setBalance] = useState<{ pending?: { currency: string, amount: number }[] }>({});
    const [loading, setLoading] = useState(false);
    const {auth} = useSelector((state:userObject) => ({...state}));
    const {user} = auth;

    const handlePayoutSettings = async () => {
        setLoading(true);
        try{
            let res = await payoutSetting(auth.token);

            window.location.href=(res as paymentSettingResponse).data.url;

            setLoading(false);
        }catch(error:any){
            console.log("Error", error.message);
            toast.error('Unable to access settings. Try again.');
            setLoading(false);
        }
    }

    useEffect(() => {

            getAccountStatus(auth.token).then((balance) => {
                setBalance((balance as accountStatusResponse).data);
            }).catch((error:any) => {
                console.log(error);
            }) ;

    }, [auth.token]);
    
    return (
        <div className="d-flex container-xxl justify-content-around">
            <Card>
                <Card.Meta title={user.name} description={`Joined ${(diffDays(new Date(), new Date(user.createdAt)))} ago`} avatar={<Avatar>{user.name[0]}</Avatar>} />
            </Card>
        
        {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && 
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