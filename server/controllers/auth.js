import User from "../models/user";
import jwt from 'jsonwebtoken';

export const showMessage = (req, res) =>{
    res.status(200).send(`Here is your message ${req.params.message}`);
};

export const register = async (req, res) =>{
    const {name, email, password} = req.body;
    //validation
    if (!name){
        return res.status(400).send('Name is required');
    }
    if (!password || password.length < 6){
        return res.status(400).send('Password is required and should be min 6 characters long');
    }
    if (!email){
        return res.status(400).send('Email is required');
    }

    // findOne is a mongoose method to find one document in the database that matches the query
    let userExist = await User.findOne({email: email}).exec();
    
    // if the user exists, return an error message. Else create a new user and save it to the database
    if (userExist){
        return res.status(400).send('Email is taken');
    }else{
        const user = new User(req.body);
        try{
            await user.save();
            console.log('USER CREATED', user);
            return res.json({ok: true});
        }catch (error){
            console.log('USER REGISTERATION FAILED', error);
            return res.status(400).send('Error. Try again.');
        }
    }
};

export const login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    try {
      // check if user with that email exist
      let user = await User.findOne({ email }).exec();
      // console.log("USER EXIST", user);
      if (!user) res.status(400).send("User with that email not found");
      // compare password
      user.comparePassword(password, (err, match) => {

        if (!match || err) return res.status(400).send("Wrong password");
        // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stripe_account_id: user.stripe_account_id,
            stripe_seller: user.stripe_seller,
            stripeSession: user.stripeSession,
          },
        });
      });
    } catch (err) {
      console.log("LOGIN ERROR", err);
      res.status(400).send("Signin failed");
    }
  };