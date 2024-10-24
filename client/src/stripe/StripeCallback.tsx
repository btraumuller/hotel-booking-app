import {LoadingOutlined} from '@ant-design/icons';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountStatus } from '../actions/stripe';

const StripeCallback = ({history}:any) => {
    const {auth} = useSelector((state:any) => ({...state}));
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        const accountStatus = async () => {
            
            try {
                const res = await getAccountStatus(auth.token);
                console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK",res);

            } catch (error) {
                console.log(error);
            }
        }

        if (auth && auth.token) {
            accountStatus();
        }
    }, [auth]);
    
    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 text-danger p-5"/>
        </div>
    )
}

export default StripeCallback;