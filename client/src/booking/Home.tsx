import { useState, useEffect } from "react";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import { allHotels } from "../actions/hotel";
import { hotel, hotelArray } from "../types/hotel";
function Home() {
   
    const [hotels, setHotels] = useState<hotel[]>([]);

    useEffect(() => {
      try{

        allHotels().then((res) =>{
          return setHotels((res as hotelArray).data);
        });

      }catch(err){
        console.log(err);
      }
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
            hotels.map((h:hotel) => (<SmallCard key={h._id} h={h} showViewMoreButton={true}  /> ))
          }
          
        </div>
      </>
    );
  }

export default Home;