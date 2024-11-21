import { useState, useEffect } from "react";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import { allHotels } from "../actions/hotel";
import { hotel, hotelArray } from "../types/hotel";
function Home() {
   
    const [hotels, setHotels] = useState<hotel[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        allHotels().then((res) => {
          
          if (!res) {
            throw new Error('Load Sellers Hotel Failed');
          }

          setLoading(false);

          return setHotels((res as hotelArray).data);

        }).catch((error:any) => {
          console.log("Error", error.message);
          setLoading(false);
        });

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
            {hotels?
              hotels.length === 0 ? 
                (<h2 className="text-center">
                  {loading ? 'Loading...' : 'No hotels found'}
                </h2>) 
                : 
                hotels.map((h:hotel) => (<SmallCard key={h._id} h={h} showViewMoreButton={true}  /> ))
              : 
              (<h2 className="text-center">There is an issue with the server. Please try again later.</h2>)               
            }
          </div>
        </>
      );
}   

export default Home;