import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema} = mongoose;

// trim removes any white spaces in the input
const userSchema = new Schema({
    name: {
        type:String,
        trim:true,
        required: false
    },
    email: {
        type:String,
        trim:true,
        required: 'Email is required',
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max:64
    },
    stripe_account_id: '',
    stripe_seller:{},
    stripe_Session:{}

}, {timestamps: true});

// pre save hook from mongoose to hash the password before saving it to the database using bcrypt. 
// bcrypt is a library that hashes the password
userSchema.pre('save', function(next){
    let user = this;
    if (user.isModified('password')){
        // 12 is the number of rounds to hash the password
        return bcrypt.hash(user.password, 12, function(err, hash){
            if (err){
                console.log('BCRYPT HASH ERR', err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    }else{
        return next();
    }
});

// compare password method to compare the password entered by the user with the hashed password in the database
userSchema.methods.comparePassword = function(password, next){
    bcrypt.compare(password, this.password, function(error, match){
        if (error){
            console.log('compare password error', error);
            return next(err, false);
        }
        // if no error, we get null and the match is true
        console.log('MATCH PASSWORD', match);
        return next(null, match);
    });
}

export default mongoose.model('User', userSchema);