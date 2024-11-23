import { useState, useEffect } from "react";
import queryString from "query-string";
import {searchListings} from "../actions/hotel";
import { Hotel, HotelResponse, HotelQuery } from "../types/hotel";
import Search from "../components/forms/Search";
import SmallCard from "../components/cards/SmallCard";
export default function SearchResults() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    useEffect(() => {

        const {location, date, bed} = queryString.parse(window.location.search);

        let searchParams:HotelQuery = {
            location: typeof location === 'string' ? location : '',
            date: typeof date === 'string' ? date : '',
            bed: typeof bed === 'string' ? bed : ''
        };

        searchListings(searchParams).then((res) => {
            setHotels((res as HotelResponse).data);
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
                {hotels.map((h:Hotel) => ( 
                    <SmallCard key={h._id} h={h} showViewMoreButton={true} owner={false} />
                ))}
            </div>
        </div>
    )
}