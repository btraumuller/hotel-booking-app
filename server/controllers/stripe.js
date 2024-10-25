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

const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                },
            },
        },
    });

    return account;
}

export const getAccountStatus = async (req, res) => {
    console.log("GET ACCOUNT STATUS");
    const user = await User.findById(req.auth._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    //update delay days
    const updatedAccount = await updateDelayDays(account.id);
    //update account and send everything except password
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            stripe_seller: updatedAccount,
        },
        { new: true } //make sure this account is updated immediately
    ).select("-password").exec();

    res.json(updatedUser);
}

export const getAccountBalance = async (req, res) => {
    const balance = await stripe.balance.retrieve({
        stripeAccount: req.body.accountId,
    });
    res.json(balance);
}

export const getPayoutSetting = async (req, res) => {
    try{
        const user = await User.findById(req.auth._id).exec();
        const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id,{
            redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
        });
        res.json(loginLink);
    }catch(error){
        console.log('Payout setting error',error);
    }
}
