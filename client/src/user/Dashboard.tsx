import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { userHotelBookings } from "../actions/hotel";
import { errorObject, userObject } from "../types/global";
import DasboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import BookingCard from "../components/cards/BookingCard";
import { toast } from "react-toastify";
import { bookingHotel, bookingHotelResponse } from "../types/hotel";

function Dashboard(){
    
    const {auth} = useSelector((state:userObject) => ({...state}));
    const [booking, setBooking] = useState<bookingHotel[]>([]);
    
    useEffect(() => {

        userHotelBookings(auth.token).then((res) => {
            if (!res) {
                throw new Error('Load Booking Failed');
            }
            setBooking((res as bookingHotelResponse).data); 
        }).catch((error:errorObject) => {
            console.log(error.message);
            toast.error('Load Booking Failed');
        });

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
                        </div>
                        <div className="col-md-2">
                            <Link to="/" className="btn btn-primary">Browse Hotels</Link>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {booking?
                            booking.length === 0 ? 
                                <h4>No bookings created</h4> :
                                booking.map((b:bookingHotel) =>(
                                    <BookingCard key={b._id} h={b.hotel} session={b.session} orderedBy={b.orderedBy} />
                                ))
                            :
                            <h4>There is an issue with the server. Please try again later.</h4>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;