import DasboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import {Link} from 'react-router-dom';

function DashboardSeller(){
    return (
        <>
            <div className="container-fluid text-center p-5 bg-secondary">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DasboardNav />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Hotels</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/hotels/new" className="btn btn-primary">Add New Hotel</Link>
                    </div>
                </div>
                <p>Dashboard Page</p>
            </div>
        </>
    )
}
export default DashboardSeller;