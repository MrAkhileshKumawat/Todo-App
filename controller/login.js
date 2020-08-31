// const bcrypt = require("bcryptjs") 
// const knex = require("../model/knex");
// const secret_key = process.env.SECRET_KEY

// module.exports = (req,res,next)=>{
//         knex("users").havingIn("email",req.body.email)
//         .then((user)=>{
//             if(user.length){
//                 user = user[0]
//                 const result = bcrypt.compareSync(req.body.password, user.password)
//                 if(result){
//                     res.send({success:"Login successful"})

//                 }else{
//                     next(new Error("Your Password Is Incorrect"))
//                 }
//             }else{
//                 next(new Error("User Not Found") ,error.satus=404)
//             }  
//         }).catch((error)=>{
//             next(error)
//         })
//     }
