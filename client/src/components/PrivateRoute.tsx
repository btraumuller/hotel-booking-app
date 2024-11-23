import {Route, Redirect} from 'react-router-dom';
import { useAuth } from '../selectors/auth';
// rest is a prop that contains all the props that are passed to the component
const PrivateRoute = ({...rest}) => {
    
    const auth = useAuth(); 
    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
}

export default PrivateRoute;