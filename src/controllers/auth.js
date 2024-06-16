import { createUser, loginUser } from "../services/auth.js";

export const registerUserController =  async (req, res, next)=>{
const user = await createUser(req.body);
res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {user}, 
})

}
export const loginUserController =  async (req, res, next)=>{
    const session = await loginUser(req.body);
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {accessToken: session.accessToken}, 
    })
    
    }