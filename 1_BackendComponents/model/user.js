import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type:  String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String
    },
    profilePic : {
        type : String
    }
})

const User = mongoose.model('User', userSchema);
export default User;