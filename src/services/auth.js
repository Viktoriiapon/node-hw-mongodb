import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import createHttpError from "http-errors";
import crypto from "crypto"
import { Session } from "../db/models/session.js";


export const createUser = async (payload)=>{
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await User.findOne({ email: payload.email });
  
    if (user) {
      throw createHttpError(
        409,
        'Email in use',
      );
    }
return await User.create({
    ...payload, 
        password: hashedPassword,
    }); 
}


export const loginUser = async ({email, password})=>{
    const user = await User.findOne({email});

    if(!user){
        throw createHttpError(404, 'User is not found');
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw createHttpError(401, 'Unauthorized');
    }

await Session.deleteOne ({userId : user._id});

    const accessToken = crypto.randomBytes(10).toString('base64');
    const refreshToken = crypto.randomBytes(10).toString('base64');

    return await Session.create({
        accessToken,
        refreshToken,
        userId: user._id,
        accessTokenValidUntil: Date.now() + 1000 * 60 * 15,
        refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 30,
    })


}




  