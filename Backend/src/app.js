import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiError } from './utils/apiError.utils.js';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    limit: '20kb'
}));
app.use(express.static('public/temp'));
app.use(cookieParser());


import { userRouter } from './routes/user.route.js';
app.use('/api/v1/user', userRouter);








app.use((err, req, res, next) => {
    console.error("Error caught:", err); // optional: logs error

    if (err instanceof apiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    // default fallback
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});
export { app }