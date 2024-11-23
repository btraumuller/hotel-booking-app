import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../selectors/auth";
import { diffDays, isAlreadyBooked, loadSellerHotel } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";
import { MatchParams } from "../types/global";
import { GetHotelResponse, IsAlreadyBookedResponse } from "../types/hotel";
import { StripeSessionIdResponse } from "../types/stripe";

export default function ViewHotel({match}: MatchParams) {
    const history = useHistory();
    const [hotel, setHotel] = useState({
        title: "",
        content: "",
        location: "",
        price: "",
        from: "",
        to: "",
        bed: "",
        postedBy: {
            name: ""
        }
    });
    const [loading, setLoading] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const auth = useAuth();
    const [preview, setPreview]=  useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    let init: React.MutableRefObject<boolean> = useRef(true);

    useEffect(() => {
        
        if (init.current){

            loadSellerHotel(auth.token, match.params.hotelid).then((res) => {
                setHotel({...hotel, ...(res as GetHotelResponse).data});
                setPreview(`${process.env.REACT_APP_Server_API}/hotel/image/${match.params.hotelid}`);
            }).catch((error:any) => {
                console.log(error);
            });

            init.current = false;
        }

    }, [match.params.hotelid, hotel, auth.token]);

    useEffect(() => {
        
        isAlreadyBooked(auth.token, match.params.hotelid).then((res) =>{
            setAlreadyBooked((res as IsAlreadyBookedResponse).data.ok);
        }).catch((error:any) => {
            console.log(error);
        });
        
    }, [auth, match.params.hotelid]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();

        setLoading(true);

        if (!auth) {
            history.push('/login')
        }
        
        try{
            let res = await getSessionId(auth.token, match.params.hotelid);

            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY as string);

            stripe?.redirectToCheckout({
                sessionId: (res as StripeSessionIdResponse).data.sessionId,
            })
            .then (result => console.log(result));
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>{hotel.title}</h2>
            </div>
            <div className="container-xxl">
                <div className="row pt-4">
                    <div className="col-md-6">
                        <img src={preview} alt={hotel.title} className="img img-fluid m-2" />
                    </div>
                    <div className="col-md-6 pt-3">
                        <b className="">{hotel.content}</b>
                        <p className="alert alert-info mt-3">Price: ${hotel.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                For: {diffDays(new Date(hotel.from), new Date(hotel.to))}
                            </span>
                        </p>
                        <p>
                            From: <br /> {new Date(hotel.from).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                        </p>
                        <p>
                            To: <br /> {new Date(hotel.to).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                        </p>
                        <i>Posted By: {hotel.postedBy && hotel.postedBy.name}</i>
                        <br />
                        <button className="btn btn-block btn-lg btn-primary mt-3" onClick={handleClick} disabled={loading || alreadyBooked}>
                            {loading ? 
                                "Loading..."
                                : alreadyBooked ? "Already Booked"
                                : auth && auth.token ? 
                                "Book Now" : "Login to Book"
                            }
                        </button>
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    )
}