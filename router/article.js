const express=require("express")
const router=express.Router()
const ExpressJoi=require("@escook/express-joi")
//导入验证
const {addArticle,ArticleId,updateArt}=require("../validate/article_validate")
//导入路由方法
const Article=require("../router_handler/article")
//挂载路由
router.get("/getArtCase",Article.getArtList)
router.post("/addArtCase",ExpressJoi(addArticle),Article.addArtList)
router.delete("/deleteArtCase/:id",ExpressJoi(ArticleId),Article.deleteArticle)
router.get("/selectArtCase/:id",ExpressJoi(ArticleId),Article.selectArticle)
router.post("/updateArticle",ExpressJoi(updateArt),Article.updateArticle)
module.exports=router

