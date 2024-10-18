import {Link} from 'react-router-dom';
function DasboardNav(){
    const active = window.location.pathname;
    return(
        <ul className='nav nav-tabs'>
            <li className='nav-itemn'>
                <Link to='/dashboard' className={`nav-link ${active ==='/dashboard' && 'active'}`}>Your Bookings</Link>
            </li>
            <li className='nav-itemn'>
                <Link to='/dashboard/sellers' className={`nav-link ${active ==='/dashboard/sellers' && 'active'}`}>Your Hotels</Link>
            </li>
        </ul>
    )
}

export default DasboardNav;