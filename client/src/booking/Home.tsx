import axios from "axios";
import { useState, useEffect } from "react";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";

function Home() {
   
    const [hotels, setHotels] = useState([]);
    const owner: boolean = true;

    const handleHotelDelete = async (hotelId:any) => {
        console.log("delete?", hotelId);
    }

    const loadAllHotels = async () => {
      try {
          
          let res:any = await axios.get(`${process.env.REACT_APP_Server_API}/all-hotels`);
          setHotels(res.data);

      }catch(err){
          console.log(err);
      }
          
    }

    useEffect(() => {
        loadAllHotels();
    }, []);

    return (

      <>
        <div className="container-fluid h1 p-5 text-center">
          <h1>All Hotels</h1>
        </div>
        <div className="container-xl">
          <br />
          <Search />
        </div>
        <div className="container-xl">
          {hotels.length === 0 ? 
            (<h2 className="text-center">No hotels found</h2>) 
            : 
            hotels.map((h:any) => (<SmallCard key={h._id} h={h} showViewMoreButton={true} handleHotelDelete={handleHotelDelete} owner={owner} /> ))
          }
          
        </div>
      </>
    );
  }

export default Home;