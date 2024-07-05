import User from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

export const register = async (req, res)=>{
    try {
        console.log(req.file);
        console.log(req.body);
        const {fname, lname, email, password, phoneNo} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        const user = new User({
            fname,
            lname,
            email,
            password : hashedPassword,
            phoneNo,
            profilePic : (req?.file?.originalname) ? req.file.originalname : undefined
        });

        await user.save();
        return res.status(201).json(user);
        
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({error: 'email and password are required'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({error: "Invalid creds"});
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
           return res.status(401).json({error: 'Invalid creds'});
        }

        const token = jwt.sign({_id : user._id}, 'my_secret', {expiresIn : '1h'});

        console.log(token);

         console.log(user);
        return res.status(200).json({message: 'Login Approved for', token, email: user.email, fname: user.fname});
    } catch (error) {
       return res.status(500).json({error: error.message});
    }
}

export const getDashboard = async (req, res) => {
    console.log('req.user', req.user);
    res.status(200).json({message : "this is restricted route"})
}
