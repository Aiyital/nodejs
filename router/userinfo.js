const express=require("express")
const { ModuleFilenameHelpers } = require("webpack")
const router=express.Router()
const ExpressJoi=require("@escook/express-joi")
//导入路由函数
const userinfo=require("../router_handler/userinfo")
//导入表单验证规则
const {baseInfo,selectInfo,validatePwd,updateAvater}=require("../validate/register")

router.get("/baseinf",userinfo.selectBaseInfomation)
router.post("/updateinf",ExpressJoi(baseInfo),userinfo.updateInfo)
//更新密码
router.post("/updatePwd",ExpressJoi(validatePwd),userinfo.updtaePwd)
//更换头像
router.post("/update_avater",ExpressJoi(updateAvater),userinfo.updateAvater)
module.exports=router