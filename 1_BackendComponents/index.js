import express from 'express';
import { connectdb } from './utils/db.js';
import UserRoutes from './routes/user.js'
import blogRoutes from './routes/blog.js'
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
connectdb();

app.use('/api/v1', UserRoutes);

app.use('/api/v1', blogRoutes);

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});