import { User } from "../models/user.models.js";

export const register = async (req,res) => {
    try{
        const {name,email,password,role} = req.body;

        if(!name||!email||!password||!role){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email"
            })
        }

        await User.create({
            name,
            email,
            password,
            role
        })

        return res.status(201).json({
            success:true,
            message:"Account Create Successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"failed to register"
        })
    }
}