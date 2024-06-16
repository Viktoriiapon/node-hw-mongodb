import { createUser } from "../services/auth.js";

export const registerUserController =  async (req, res, next)=>{
const user = await createUser(req.body);
res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: {user}, 
})

}