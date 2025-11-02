import express from 'express'
import { getCurrentUser ,getCurrentAdmin} from '../controller/userController.js';
import isAuth from '../middleware/isAuth.js'
import adminAuth from '../middleware/adminAuth.js';



const userRoutes=express.Router();

userRoutes.get('/getCurrentUser',isAuth,getCurrentUser)
userRoutes.get('/getCurrentAdmin',adminAuth,getCurrentAdmin)


export default userRoutes;