import { useEffect, useState } from "react";
import DasboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from "axios";
//import { userHotelBookings } from "../actions/hotel";
import BookingCard from "../components/cards/BookingCard";
function Dashboard(){
    const {auth} = useSelector((state:any) => ({...state}));
    const [booking, setBooking] = useState([]);
    
    useEffect(() => {
        const loadUserBookings = async () => {
            const res:any = await axios.get(`${process.env.REACT_APP_Server_API}/user-hotel-bookings`, {
                headers:{
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setBooking(res.data);
        }
        loadUserBookings();
    },[auth.token]);

    return (
        <>
            <div className="container-fluid p-5 text-center bg-secondary">
                <ConnectNav />  
            </div>
            <div className="container-xxl">
                <div className="container-fluid p-4">
                    <DasboardNav />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <h2>Your Bookings</h2>
                            {booking.map((b:any) =>(
                                <BookingCard key={b._id} h={b.hotel} session={b.session} orderedBy={b.orderedBy} />
                            ))}
                        </div>
                        <div className="col-md-2">
                            <Link to="/" className="btn btn-primary">Browse Hotels</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;