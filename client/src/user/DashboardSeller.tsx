import React from "react";
import DasboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import axios from "axios";
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {HomeOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify';
import SmallCard from "../components/SmallCard";

function DashboardSeller(){

    const {auth} = useSelector((state:any) => ({...state}));
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    let connectedUser = auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled? true : false;
    
    const handleClick = async () => {
        setLoading(true);
        try{
            let res = await axios.post(`${process.env.REACT_APP_Server_API}/create-connect-account`, {}, {
                headers:{
                    Authorization: `Bearer ${auth.token}`,
                }
            });

            window.location.href = res.data;
            

        }catch (error){
            console.log(error);
            toast.error('Stripe connect failed, Try again.');
            setLoading(false);
        }         
    }

    useEffect(() => {
        const loadSellers = async () => {
            try{
                let res = await axios.get(`${process.env.REACT_APP_Server_API}/seller-hotels`, {
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setHotels(res.data);
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
                        <div className="row">
                            {
                                hotels.map((h:any) => (<SmallCard key={h._id} h={h} handleHotelDelete={()=> console.log('test')} showViewMoreButton={false} owner={true} />))
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
                        <p>Dashboard Page</p>
                    </div>
                )
            }

        </>
    )
}
export default DashboardSeller;