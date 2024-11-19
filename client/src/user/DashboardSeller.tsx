import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {HomeOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify';
import { deleteHotel, sellerHotels } from '../actions/hotel';
import { createConnectAccount } from '../actions/stripe';
import { userObject } from '../types/global';
import SmallCard from "../components/cards/SmallCard";
import DasboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { hotel, hotelArray } from '../types/hotel';

function DashboardSeller(){

    const {auth} = useSelector((state:userObject) => ({...state}));
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState<hotel[]>([]);
    let connectedUser = auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled? true : false;
    
    const handleClick = async () => {
        setLoading(true);
        try{
            
            let res:any = createConnectAccount(auth.token);

            window.location.href = res.data;
            
        }catch (error){
            console.log(error);
            toast.error('Stripe connect failed, Try again.');
            setLoading(false);
        }         
    }

    const handleHotelDelete = async (hotelId:string) => {
        
        if (!window.confirm('Are you sure you want to delete this hotel?')) return;

        deleteHotel(auth.token, hotelId).then((res) => {
            
            if (!res) {
                throw new Error('Hotel delete failed');
            }

            toast.success('Hotel Deleted');
            setHotels((res as hotelArray).data);

        }).catch((error:any) => {

            console.log(error);
            toast.error('Hotel Delete Failed');

        });
    }

    useEffect(() => {
        const loadSellers = async () => {
            try{
                sellerHotels(auth.token).then((res) =>{
                    if (!res) {
                        throw new Error('Load Sellers Hotel Failed');
                    }
                    setHotels((res as hotelArray).data);
                });
                
            }catch(error){
                console.log(error);
            }
        }
        
        loadSellers();

    }, [auth.token]);
    
    return (
        <>
            <div className="container-fluid text-center p-5 bg-secondary">
                <ConnectNav />
            </div>
            <div className="container-xxl">
                <div className="container-fluid p-4">
                    <DasboardNav />
                </div>
                {connectedUser ?
                    (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-10">
                                    <h2>Your Hotels</h2>
                                </div>
                                <div className="col-md-2">
                                    <Link to="/hotels/new" className="btn btn-primary">Add New Hotel</Link>
                                </div>
                            </div>
                            <div className="row mt-4">
                                {hotels.length === 0 ? 
                                    <h4>No Hotels Posted</h4> 
                                    :
                                    hotels.map((h:hotel) => (<SmallCard key={h._id} h={h} handleHotelDelete={handleHotelDelete} showViewMoreButton={false} owner={auth.user.name === h.postedBy.name? true: false} />))
                                }
                            </div>
                        </div>
                    ):(
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 offset-md-3 text-center">
                                    <HomeOutlined className="h1" />
                                    <h4>Set up payouts to post Hotel Rooms</h4>
                                    <p className="lead"> MERN partners with stripe to transfer earnings to your bank account.</p>
                                    <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                                        {
                                            loading ? 'Processing...' : 'Setup Payouts'
                                        }
                                    </button>
                                    <p className="text-muted">
                                        <small>
                                            You'll be redirected to Stripe to complete the onboarding process.
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default DashboardSeller;