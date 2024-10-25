
import express from 'express';

//controllers
import { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting } from '../controllers/stripe';

// middleware
import { requireSignin } from '../middleware';

const router = express.Router();

router.post('/create-connect-account', requireSignin, createConnectAccount);

router.post('/get-account-status', requireSignin, getAccountStatus);

router.post('/get-account-balance', requireSignin, getAccountBalance);

router.post('/payout-setting', requireSignin, payoutSetting);

module.exports = router;