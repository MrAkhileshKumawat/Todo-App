const city = require("../controller/city")
const signup = require("../controller/signup")
const login = require("../controller/login")
const getusers=require("../controller/getusers")
const postTodo = require("../controller/todo")
const getTodo = require("../controller/get_todos")
const logic = require("../controller/logic")

const express = require ("express");
const router = express.Router();


const knex = require("../model/knex");
const isverify = require("../middleware/auth")
const { properTodo } = require("../controller/logic")


router.post("/users",signup(knex,logic.prettyfyUserDetails))
router.post("/cities",city(knex))
router.get("/users",isverify,getusers.alluser)
router.get("/users/:userId",isverify,getusers.oneUser)
router.post("/todos",isverify,postTodo(knex,logic.prettyfyTodo))
router.get("/mytodos",isverify,getTodo.mytodos(knex))
router.get("/todos",isverify,getTodo.todos(knex))





module.exports = router
