import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";
function Home() {
    const {user} = useSelector((state:any) => ({...state}));
    const [hotels, setHotels] = useState([]);
    const owner: boolean = true;
    const handleHotelDelete = async (hotelId:any) => {
        console.log("delete?", hotelId);
    }

    const loadAllHotels = async () => {
    try {
        
        let res:any = await axios.get(`${process.env.REACT_APP_Server_API}/all-hotels`);
        setHotels(res.data);

    }catch(error){
        console.log(error);
      }
        
    }

    useEffect(() => {
        loadAllHotels();
    }, []);

    return (

      <>
        <div className="container-fluid h1 p-5 text-center">
          <h1>Home {JSON.stringify(user)}</h1>
        </div>
        <div className="container-xl">
          {hotels.map((h:any) => (<SmallCard key={h._id} h={h} showViewMoreButton={true} handleHotelDelete={handleHotelDelete} owner={owner} /> ))}
        </div>
      </>
    );
  }

export default Home;