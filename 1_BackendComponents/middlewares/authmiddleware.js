import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = await jwt.verify(token, 'my_secret');

        console.log(decoded);

        const user = await User.findById({_id : decoded._id});

        console.log(user);
        req.user = {
            _id : user._id,
            firstName : user.fname,
            lastName : user.lname,
            email : user.email
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'No token provided' });
    }
}