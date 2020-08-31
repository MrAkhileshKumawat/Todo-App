const knex = require("../model/knex");
const prettyfyUserDetails = require("../controller/logic").prettyfyUserDetails
const city = require("./city");
exports.alluser = async (userEmail ,req,res,next)=>{
    let ageMoreThan = Number(req.query.ageMoreThan) || 0
    let ageLessThan = Number(req.query.ageLessThan) || 999
    let cityId = req.query.cityId 
        knex("users")
        .join("city","users.cityId","=","city.id")
        .select("users.id","users.name ","city.name as cityname","eMail","age","cityId")
        .whereBetween("age",[ageMoreThan,ageLessThan])
        .andWhere(function(){
            if(cityId!==undefined){
                this.where("cityId",cityId)
            }else{
                this.orWhereNotNull("cityId")
            }
        })
        .then(async(userdetail)=>{
            if(userdetail.length){
                res.send({users:await prettyfyUserDetails(userdetail)})

            }else{res.send({message:"No data for the current filter"})}
        }).catch((error)=>{
            next(error)
        })
}

exports.oneUser = async (userEmail ,req,res,next)=>{
    const id = req.params.userId 
    if(id!==undefined){
        knex("users")
        .join("city","users.cityId","=","city.id")
        .select("users.id","users.name ","city.name as cityname","eMail","age","cityId")
        .where("users.id",id)
        .then(async(userdetail)=>{
            if(userdetail.length){
                let user = await prettyfyUserDetails(userdetail)
                res.send({user:user[0]})
            }else{next(new Error("Not Found"))}
            
        }).catch((error)=>{
            next(error)
        })
    }
   
}