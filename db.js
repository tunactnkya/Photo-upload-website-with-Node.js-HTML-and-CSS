import mongoose from 'mongoose';

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "photoupload_tr",
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connected to the db succesfuly");
    }).catch((err) => {
        console.log(`DB connected err:, ${err}`);
    })
}

export default conn;