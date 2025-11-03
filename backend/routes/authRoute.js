import express from 'express'
import {registration,login, logout,googleLogin, adminLogin} from '../controller/authController.js'


const authRoute=express.Router();


authRoute.post('/registration',registration)
authRoute.post('/login',login);
authRoute.post('/logout',logout)
authRoute.post('/gooleLogin',googleLogin);

authRoute.post('/adminLogin',adminLogin);


export default authRoute;
