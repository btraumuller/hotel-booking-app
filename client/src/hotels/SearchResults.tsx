import { useState, useEffect } from "react";
import Search from "../components/forms/Search";
import queryString from "query-string";
import {searchListings} from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
export default function SearchResults() {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        const {location, date, bed} = queryString.parse(window.location.search);
        searchListings({location, date, bed}).then((res:any) => {
            setHotels(res.data);
        });
    }, []);
    return (
        <div className="container">
            <div className="row pb-5">
                <h1>Search Results</h1>
            </div>
            <div className="col">
                <Search />
            </div>
            <div className="row">
                {hotels.map((h:any) => ( 
                    <SmallCard key={h._id} h={h} showViewMoreButton={true} owner={false} />
                ))}
            </div>
        </div>
    )
}