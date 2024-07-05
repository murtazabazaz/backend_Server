import mongoose from 'mongoose';

const MONGOOSE_URL = 'mongodb://localhost:27017/practicedb'

export const connectdb = async () => {
    try {
        mongoose.connect(MONGOOSE_URL);
        console.log('Db connected');
    } catch (error) {
        console.log('db not connected.')
    }
}

