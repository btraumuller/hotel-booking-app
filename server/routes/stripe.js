
import express from 'express';

//controllers
import { 
    createConnectAccount, 
    getAccountStatus, 
    getAccountBalance, 
    payoutSetting, 
    stripeSessionId, 
    stripeSuccess
} from '../controllers/stripe';

// middleware
import { requireSignin } from '../middleware';

const router = express.Router();

router.post('/create-connect-account', requireSignin, createConnectAccount);

router.post('/get-account-status', requireSignin, getAccountStatus);

router.post('/get-account-balance', requireSignin, getAccountBalance);

router.post('/payout-setting', requireSignin, payoutSetting);

router.post('/stripe-session-id', requireSignin, stripeSessionId);

router.post('/stripe-success', requireSignin, stripeSuccess);

module.exports = router;