import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

// rest is a prop that contains all the props that are passed to the component
const PrivateRoute = ({...rest}) => {
    
    const {auth} = useSelector((state) => ({...state}));

    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
}

export default PrivateRoute;