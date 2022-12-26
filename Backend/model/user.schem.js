import mongoose, { model } from "mongoose";
import authRole from "../utils/authRole.js";
import bcrypt from "bcryptjs"
import config from "../config/index.js";
import crypto from 'crypto'

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

// challenge-1 encrypt the password - hooks
// mongoose hook

userSchema.pre('save', async function(next){
    if( ! this.isModified("password"))
    {
        return next()
    }
    this.password= await bcrypt.hash(this.password, 10)
})

//mongoose Schema method 
// add more feature directly to your schema

userSchema.methods=
{
    //comparePassowrd
    comparePassword: async function(enterpassowrd)
    {
        return await bcrypt.compare(enterpassowrd, this.password)
    },

    //generate the jwt token
    getJwtToken: async function()
    {
       return JWT.sign(
        {
            _id:this.id,
            role:this.role
        },
        config.JWT_SECRET,
        {
            expiresIn:config.JWT_EXPIRY
        }

       )
    },
    // generate the forgot Password token

    generateForgotPasswordToken: function ()
    {
        const forgotToken=crypto.randomBytes(20).toString('hex')

        // step-1 save to DB
        this.forgetPasswordToken= crypto.
        createHash('sha256')
        .update(forgotToken)
        .digest('hex')

        this.forgotPasswordExpiry= Date.now() + 20 * 60 * 1000
        // step 2- return Value to user
        return forgetToken
    }
}

export default mongoose.model("User",userSchema)