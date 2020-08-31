const express = require("express")
const app = express()
const knex = require("./model/knex")
app.use(express.json())

require("./model/createTable")(knex)


const router = require("./router/routes")
app.use(router)


app.use((req,res,next)=>{
    var error = new Error("Not found")
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    error.status = (error.status || 500 );
    res.json({
        message:error.message
    })
})



const port = process.env.PORT || 6060
app.listen(port , ()=>{
    console.log(`server is working on port ${port}...`)
})

