import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';


const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username area is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isAlphanumeric, "Only Alphanumeric characters"]
    },
    email: {
        type: String,
        required: [true, "E-mail area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid e-mail is required"]
    },
    password: {
        type: String,
        required: [true, "Password area is required"],
        minLength: [4, "At least  4 characters"]
    }
},
    {
        timestamps: true
    }
);


//PASSWORD SECURİTY
userSchema.pre("save", function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model("User", userSchema)


export default User;