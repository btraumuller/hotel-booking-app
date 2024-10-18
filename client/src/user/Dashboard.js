import DasboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import {Link} from 'react-router-dom';
function Dashboard(){
    return (
        <>
            <div className="container-fluid p-5 text-center bg-secondary">
                <ConnectNav />  
            </div>
            <div className="container-fluid p-4">
                <DasboardNav />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/" className="btn btn-primary">Browse Hotels</Link>
                    </div>
                </div>
                <p>Dashboard Page</p>
            </div>
        </>
    )
}
export default Dashboard;