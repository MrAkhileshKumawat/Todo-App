const moment = require("moment")
const prettyfyTodo=require("../controller/logic").prettyfyTodo
moment.suppressDeprecationWarnings = true;
module.exports = (knex,prettyfyTodo) => async (userEmail,req ,res,next)=>{
    const todo=req.body
    const today= moment().format("YYYY-MM-DD")
    const date = todo.dueDate
    if(date==moment(date).format("YYYY-MM-DD")&& date>=today){
        knex("todo").insert(todo)
        .then((id)=>{
            knex.select("users.id","users.name as name","eMail","age","text","dueDate","cityId","city.name as cityname")
            .from("users")
            .join("todo","users.id","=","todo.assignedTo")
            .join("city","users.cityId","=","city.id")
            .where("users.id",todo.assignedTo)
            .andWhere("todo.id",id)
            .then(async(userDetail)=>{   
                // res.send(userDetail)           
                var todo = await prettyfyTodo(userDetail)
                res.send({"todo":todo[0]})
            }).catch((error)=>{
                next(error)
            })
        }).catch((error)=>{
            next(error)
        })
    }else{
        next(new Error("Please set dueDate in this formate  `YYYY-MM-DD` and date shouldn't be previous" ))
    }
}


