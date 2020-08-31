var jwt = require("jsonwebtoken")
const knex = require("../model/knex")
const bcrypt = require("bcryptjs");


async function isverify(req,res,next){
    try {
        var userEmail = req.headers.email
        var userPassword = req.headers.password
        if ((userEmail&&userPassword)!==undefined && userPassword!==undefined && userEmail!==null && userPassword!==null ){
            var isUserExists = knex("users").havingIn("email",userEmail)
            .then((user)=>{
                if(user.length){
                    var user = user[0]
                    const isPasswordVerify = bcrypt.compareSync(userPassword, user.password)
                    if(isPasswordVerify){
                        next(userEmail);
                    }else{
                        res.send({message:"Your Password Is Incorrect"})
                    }
                }else{
                    res.send({message:"User Not Found"})                }  
            }).catch((error)=>{
                res.send(error)            })
        }else{
            res.send({message:"Email and password should be in header"})
        }    
    } catch (error) {
        res.send(error)
        
    }
}


module.exports = isverify


