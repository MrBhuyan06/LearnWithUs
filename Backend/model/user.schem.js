import mongoose from "mongoose";
import authRole from "../utils/authRole.js";

const userSchema= mongoose.Schema(
    {
        name:
        {
            type:String,
            require:[true, "Name is Required"],
            maxLength:[50, "Name is must be less than 50"]
        },
        email:
        {
            type:String,
            require:[true, "Email is Required"],
            unique:true,

        },
        password:
        {
            type:String,
            require:[true, "Password is Required"],
            minLength:[8, "password must be atleast 8 characters"],
            select:false

        },
        role:
        {
            type:String,
            enum:Object.values(authRole)
        },
        forgetPasswordToken:String,
        forgotPasswordExpiry:String

    },
    {
        timestamps:true
    }
)