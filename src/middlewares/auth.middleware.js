
const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenAuthentication =(req,res,next)=>{
try{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(400).json({message:"Please provide the token"})
    }

    jwt.verify(token,process.env.JSON_TOKEN_SECRETKEY,(err,decoded)=>{
        if(err){
            res.status(400).json({message:"Token is invalid"})
        }

        req.user = decoded
        next()
    })

}catch(err){
    console.log(err)
}
}

module.exports = tokenAuthentication