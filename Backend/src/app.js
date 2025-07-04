import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json({
    limit: '20kb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '20kb'
}));
app.use(express.static('public/temp'));
app.use(cookieParser());


import { userRouter } from './routes/user.route.js';
app.use('/api/v1/user', userRouter);
export { app }