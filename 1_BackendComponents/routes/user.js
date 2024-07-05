import express from 'express';
import { getDashboard, loginUser, register} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/authmiddleware.js';

import multer from 'multer';

const upload = multer({ dest: 'user/pic/' })
const router = express.Router();

router.post('/register', upload.single('profilePic'),  register);

router.post('/login', loginUser );

router.get('/dashboard', isAuthenticated, getDashboard)

export default router;