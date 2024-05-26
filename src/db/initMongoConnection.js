import mongoose from "mongoose";
import { ENV_VARS } from "../constants/index.js";
import { env } from '../utils/env.js'

export const initMongoConnection = async()=>{
const connectionLink =  
`mongodb+srv://${env(ENV_VARS.MONGODB_USER)}:${env(ENV_VARS.MONGODB_PASSWORD)}@${env(ENV_VARS.MONGODB_URL)}/${env(ENV_VARS.MONGODB_DB)}?retryWrites=true&w=majority&appName=Viktoriia`;
try {
    await mongoose.connect(connectionLink)
    console.log('Mongo connection successfully established!')
} catch (error) {
    console.log(error)
    throw error;
}
}

// mongodb+srv://viktoriyaponom:<password>@viktoriia.ufrz9k6.mongodb.net/?retryWrites=true&w=majority&appName=Viktoriia