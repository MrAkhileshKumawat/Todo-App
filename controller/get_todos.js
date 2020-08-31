
var logic = require("../controller/logic")

exports.mytodos = (knex) => async (userEmail,req ,res,next)=>{
    knex("users")
    .join("todo","users.id","=","todo.assignedTo")
    .join("city","users.cityId","=","city.id")
    .where("users.eMail",userEmail)
    .select("users.id ","users.name as name","eMail","age","text","dueDate","cityId","city.name as cityname" , "city.id as cityId")
    .then(async(userDetail)=>{
        if(userDetail.length){
            res.send({todo:await logic.prettyfyTodo(userDetail)})
        }else{next(new Error("You didn't assign todo"))}
    }).catch((error)=>{
        next(error)
    })
 
}


exports.todos = (knex) => async(userEmail , req , res , next)=>{
    let pageSize=Number(req.query.pageSize)
    let pageNum = Number(req.query.pageNum)+Number(pageSize)
    console.log(pageNum)
    let assignedTo= await logic.assignedToQyery(req.query.assignedTo)
    let cityId = req.query.cityId
    // console.log(assignedTo)
    if(assignedTo){
        let dates = await logic.dueDate(req.query)
        if(dates){
            knex("users")
            .join("todo","users.id","=","todo.assignedTo")
            .join("city","users.cityId","=","city.id")
            .where(function(){
                if(assignedTo!==true){
                    this.whereIn("assignedTo",assignedTo)
                }else{
                    this.orWhereNotNull("assignedTo")
                }
            })
            .andWhere(function(){
                if(dates!==true){
                    this.whereBetween("dueDate",[dates.fromDueDate , dates.toDueDate])
                }else{
                    this.orWhereNotNull("dueDate")
                }
            })
            .andWhere(function(){
                if(cityId!==undefined){
                    this.where("cityId",cityId)
                }else{
                    this.orWhereNotNull("cityId")
                }
            }).limit(pageSize).offset(pageNum)
            .select("users.id","users.name as name","eMail","age","text","dueDate","cityId","city.name as cityname" , "city.id as cityId")
            .then(async(userDetail)=>{
                if(userDetail.length){
                    let todo = await logic.prettyfyTodo(userDetail)
                    res.send({todos:todo})
                }else{
                    res.send({message:"No data found for the given filter"})
                }
            }).catch((error)=>{
                next(error)
            }) 
        }else{next(new Error("date should be in this formate 'YYYY-MM-DD"))}
        
    }else{
        next(new Error("invalid query assignedTo , It should be like this assignedTo=1,2,3"))
    }
}


