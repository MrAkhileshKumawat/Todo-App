const { orWhereNotExists } = require("../model/knex")

module.exports = (knex)=> async(req,res,next)=>{
    knex("city").havingIn("name",req.body.name)
    .then((city)=>{
        if(city.length){
            res.send(city[0])
        }else{
            knex('city').insert(req.body)
            .then((id)=>{
                knex('city').where('id',id)
                .then((result)=>{
                    res.send(result[0])
                })
            }).catch((error)=>{
                next(error)
            })
        }
    }).catch((error)=>{
        next(error)
    })
        
}
