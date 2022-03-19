const express=require("express")
const ExpressJoi=require("@escook/express-joi")
const router=express.Router()
// 导入路由方法
const {register_validate}=require("../validate/register")
const router_handler=require("../router_handler/user")


router.post("/register",ExpressJoi(register_validate),router_handler.Register)
router.post("/login",ExpressJoi(register_validate),router_handler.Login)

module.exports=router