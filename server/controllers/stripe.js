import User from '../models/user';
import Stripe from 'stripe';
import queryString from 'query-string';
import Hotel from '../models/hotel';
import Order from '../models/order';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
    // find user from database
    const user = await User.findById(req.auth._id).exec();
    console.log("USER===>", user);
    let accountLink;
    if (!user.stripe_account_id) {
        
        const account = await stripe.accounts.create({
            type: 'express',
        });

        // update and save stripe_account_id in user database
        user.stripe_account_id = account.id;
        user.save();
    }

    if (!user.stripe_seller){
        accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: 'account_onboarding',
        });

        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email || undefined,
        });

    }else{
        accountLink = await stripe.accounts.retrieve(user.stripe_account_id);
        
        let updateDbAccount = await User.findByIdAndUpdate(req.auth._id, {
            stripe_seller: accountLink,
        },{new: true}).select("-password").exec();

    }
   

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

export const payoutSetting = async (req, res) => {
    try{
        const user = await User.findById(req.auth._id).exec();
        const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id,{
            redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
        });
        res.json(loginLink);
    }catch(error){
        console.log('Payout setting error',error);
    }
}

export const stripeSessionId = async (req, res) => {
    const {hotelId} = req.body;
    
    const item = await Hotel.findById(hotelId).populate('postedBy').exec();
    const fee = (item.price * 20) / 100;
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ 
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100,
            },
            quantity: 1,
        }],
        payment_intent_data: {
            application_fee_amount: fee,
            transfer_data: {
              destination: item.postedBy.stripe_account_id,
            },
        },
        success_url: process.env.STRIPE_SUCCESS_URL + `/${item._id}`,
        cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    await User.findByIdAndUpdate(req.auth._id, {stripeSession: session}).exec();
    
    res.send({sessionId: session.id});
}

export const stripeSuccess = async (req, res) => {
    const {hotelId} = req.body;
    const user = await User.findById(req.auth._id).exec();
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
    
    if (!user.stripeSession) return;
        
    if (session.payment_status === 'paid'){
        
        const orderExist = await Order.findOne({'session.id': session.id}).exec();
        
        if (orderExist){
            res.json({success: true});

        }else{
            let newOrder = await new Order({
                hotel: hotelId,
                session,
                orderedBy: user._id,
            })
            
            newOrder.save();

            await User.findByIdAndUpdate(user._id, {
                // $set is a mongoose method to update the stripeSession object in the user model
                $set: {stripeSession: {}},
            }).exec();

            res.json({success: true});
        }
        
    }

}
