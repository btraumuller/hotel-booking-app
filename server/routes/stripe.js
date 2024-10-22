
import express from 'express';

//controllers
import { createConnectAccount } from '../controllers/stripe';

// middleware
import { requireSignin } from '../middleware';

const router = express.Router();

router.post('/create-connect-account', requireSignin, createConnectAccount);

module.exports = router;