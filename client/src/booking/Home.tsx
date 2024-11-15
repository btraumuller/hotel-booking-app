import { useState, useEffect } from "react";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";
import { allHotels } from "../actions/hotel";

function Home() {
   
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
      try{

        allHotels().then((res:any) =>{
          setHotels(res.data);
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
            hotels.map((h:any) => (<SmallCard key={h._id} h={h} showViewMoreButton={true}  /> ))
          }
          
        </div>
      </>
    );
  }

export default Home;