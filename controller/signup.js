
const bcrypt = require("bcryptjs");

module.exports = (knex,prettyfyUserDetails) => async (req ,res,next)=>{
    user=req.body
    const hash =await bcrypt.hashSync(user.password, 10);
    user.password=hash
    knex("users").insert(user)
    .then((id)=>{
        knex("users")
        .join("city","users.cityId","=","city.id")
        .select("users.id","users.name ","city.name as cityname","eMail","age","cityId")
        .where("users.id",id)
        .then(async(userdetail)=>{
            // res.send(userdetail)
            let user=await prettyfyUserDetails(userdetail)
            res.send(user[0])
        })
    }).catch((error)=>{
        next(error)
        
    })
}

