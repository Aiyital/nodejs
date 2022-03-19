const express=require("express")
const router=express.Router()
const ExpressJoi=require("@escook/express-joi")
const {validatePub}=require("../validate/public")
// 导入路由函数
const PublicArt=require("../router_handler/public")

//添加路由函数
router.post("/addArt",ExpressJoi(validatePub),PublicArt.publicArticle)

// 挂载
module.exports=router