import { User } from "../db/models/user.js"


export const createUser = async (payload)=>{
    // const hashedPassword =
return await User.create(payload); 
}