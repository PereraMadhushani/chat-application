import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/util.js"


export const signup =async (req, res) =>{
    const {fullName, email,password} = req.body

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if(password.length <6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        //check if emails valid:regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }
        const user = await User.findOne({email});
        if (user) return res.status(400).json({message:"Email already exists."})

        //123456 => $ertyjkmnbvcx
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            //Brfore code rabbit
            // generateToken(newUser._id, res);
            // await newUser.save();

                        //Brfore code rabbit
            //Persist user first, then issue auth cookie
            const saveUser = await newUser.save();
            generateToken(saveUser._id, res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
        } else{
            res.status(400).json({message:"Invalid user data"})
        }


    } catch (error){
        console.log("Error in signup controller:", error);
        res.status(500).json({message:"Internal server error"})    }
}