import React from "react";
import { useSelector } from "react-redux";

function Home() {
    const {user} = useSelector((state:any) => ({...state}));
    return (
      <div className="container-fluid h1 p-5 text-center">
        <h1>Home {JSON.stringify(user)}</h1>
      </div>
    );
  }

export default Home;