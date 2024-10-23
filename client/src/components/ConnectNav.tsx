import { useSelector } from "react-redux";
import {Card, Avatar} from "antd";


function ConnectNav() {
    const {auth} = useSelector((state:any) => ({...state}));
    const {user} = auth;
    const compareDays = () => {

        let today:any = new Date();
        let createdAt:any = new Date(user.createdAt);
        const diff:any = today - createdAt;
        const days:number = diff/(1000*60*60*24);
    
        return Math.round(days) > 1 ? `${Math.round(days)} days` : `${Math.round(days)} day`;
    } 
    return (
        <>
        <div className="d-flex justify-content-around">
            <Card>
                <Card.Meta title={user.name} description={`Joined ${(compareDays())} ago`} avatar={<Avatar>{user.name[0]}</Avatar>} />
            </Card>
        </div>
        {auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && 
            <>
                <div>Balance</div>
                <div>Payout Settings</div>
            </>
        }
        </>
    )
}
export default ConnectNav;