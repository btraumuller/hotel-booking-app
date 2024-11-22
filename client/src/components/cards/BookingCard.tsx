import { useState } from "react"
import { currencyFormatter } from "../../actions/stripe"
import { diffDays } from "../../actions/hotel"
import { Hotel } from "../../types/hotel";
import OrderModal from "../modals/OrderModal";
export default function BookingCard({ h, session, orderedBy}: { h:Hotel, session:string, orderedBy:string }){
    const [showModal, setShowModal] = useState(false);
    return(
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4 p-0">
                    {h.image && h.image.contentType ? (
                        <img 
                            src={`${process.env.REACT_APP_Server_API}/hotel/image/${h._id}`}
                            alt="hotel" 
                            className="card-image img img-fluid" />
                    ):(
                        <img 
                            src="https://via.placeholder.com/900x500.png" 
                            alt="hotel" 
                            className="card-image img img-fluid" />
                    ) 
                    }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">
                            {h.title}{" "}
                            <span className="float-right text-primary">
                                {currencyFormatter({
                                    amount: Number(h.price) * 100,
                                    currency: 'usd'
                                })}
                            </span>
                        </h3>
                        <p className="alert alert-info">{h.location}</p>
                        <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(new Date(h.from), new Date (h.to))}
                            </span>
                        </p>
                        <p className="card-text">
                            Available from {new Date(h.from).toLocaleDateString()}
                        </p>
                        {showModal &&
                            <OrderModal session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal} />
                        }
                        <div className="d-flex justify-content-between h4">
                            <button className="btn btn-primary" onClick={() => setShowModal(!showModal)}>Show Payment Info</button>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}  