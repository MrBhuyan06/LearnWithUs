import dotenv from 'dotenv'
dotenv.config()

const config=
{
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY || '7d'

}

export default config