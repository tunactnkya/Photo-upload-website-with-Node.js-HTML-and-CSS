import express from 'express';
import dotenv from 'dotenv'
import conn from './db.js';
import cookieParser from 'cookie-parser';
import pageRoute from "./routes/pageRoute.js"
import photoRoute from './routes/photoRoute.js'
import userRoute from './routes/userRoute.js'
import { checkUser } from './middlewares/authMiddleware.js';
import fileUpload from 'express-fileupload';
import { v2 as clouidanry } from 'cloudinary';


dotenv.config();

clouidanry.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

//CONNECTİON TO THE DB
conn();

const app = express();
const port = 3000


app.set("view engine", "ejs");

//STATİC FİLES MİDDLEWEAR
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))


//ROUTES
app.use("*", checkUser);
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);


app.listen(port, () => {
    console.log(`Application runnig  on port: ${port}`);
})