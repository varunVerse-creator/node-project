const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const json = require('jsonwebtoken')
const Message = require('../models/message.model')
require('dotenv').config()

const userSignup = async (req,res)=>{
    try{

        const {name,phoneNumber,email,password} = req.body

        const userExists = await User.findOne({
            where:{
                phoneNumber:req.body.phoneNumber
            }
        })

        if(userExists){
            return res.status(400).json({message:"User Already Exists....."})
        }else{
           const hashPassword = await bcrypt.hash(password,Number(process.env.HASH_SALT))

           const userObject = {
            name:name,
            phoneNumber:phoneNumber,
            email:email,
            password:hashPassword
           }

            const savedUser = await User.create(userObject)
            return res.json({status:201,data:savedUser})
        }

    }catch(err){
        console.log(err)
    }
}

const userLogin = async (req,res)=>{
    try{

        const {phoneNumber,password} = req.body

        const findUser = await User.findOne({
            where:{
                phoneNumber:phoneNumber
            }
        })

        if(!findUser){
            return res.status(400).json({message : "User Not Found"})
        }else{
            const checkPassword = await bcrypt.compare(password,findUser.password)

            if (!checkPassword){
                return res.status(400).json({message : "Incorrect Password"})
            }else{

                const payloadForToken = {
                    id:findUser.id,
                    phoneNumber:phoneNumber,
                    email:findUser.email
                }

                const generateToken = json.sign(payloadForToken,process.env.JSON_TOKEN_SECRETKEY,{expiresIn:'10y'})

                res.json({status:200,token:generateToken,message: "User Login Successfully"})
            }
        }


    }catch(err){
        console.log(err)
    }
}

const updateUser = async (req,res)=>{
    try{

        const {name,phoneNumber,email} = req.body

   const userExists = await User.findOne({
    where:{
        id:id
    }
   })

   if(!userExists){
    res.status(400).json({message:"User does not exists"})
   }

   const updateUser = await User.update({name:name,phoneNumber:phoneNumber,email:email},{where:{id:req.body.id},returning:true})

   res.status(201).json({message:"User Updated Successfully",data:updateUser})

    }catch(err){
        console.log(err)
    }
}

const deleteUser = async(req,res) =>{
   try{

        const userId= req.user.id

        const userExists = await User.findOne({
            where:{
                id:userId
            }
        })

        if(!userExists){
            return res.status(400).json({message:"User does not exists"})
        }

        const deletedUser = await User.destroy({where:{id:userId}})


        res.status(201).json({message:"User deleted successfully",count:deletedUser})

   }catch(err){
    console.log(err)
   }
}


module.exports = {userSignup,userLogin,updateUser,deleteUser}