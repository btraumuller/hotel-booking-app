import User from '../models/user';
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
    // find user from database
    const user = await User.findById(req.auth._id).exec();
    console.log("USER===>", user);
    
    if (!user.stripe_account_id) {
        
        const account = await stripe.accounts.create({
            type: 'express',
        });

        // update and save stripe_account_id in user database
        user.stripe_account_id = account.id;
        user.save();
    }

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding',
    });

    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
    });

    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
    console.log("ACCOUNT LINK", accountLink);
}
