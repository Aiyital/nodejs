// 导入express CORS--跨域
const express=require("express")
const CORS=require("CORS")
const joi=require("joi")
const expressJwt=require("express-jwt")
// 导入秘钥
const {secretKey}=require("./config/config")
// 创建服务器的实例对象
const app=express()
app.use(CORS())
// 配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))
//定义需要token验证的地方
app.use(expressJwt({secret:secretKey}).unless({path:[/^\/api\//]}))
// .unless({path:[/^\/api\//]})
//自定义中间件
app.use((req,res,next)=>{
    res.Error=(err,status=1)=>{
        // let msg=err instanceof Error?err.message:err
        res.send({
            // status:status,
            // msg:msg
            status,
            msg:err instanceof Error?err.message:err
        })
    }
    next()
})

// 导入路由
const router=require("./router/user")
const baseinfo=require("./router/userinfo")
const Article=require("./router/article")
const PublicArt=require("./router/public")
app.use("/api",router)
app.use("/baseinfo",baseinfo)
app.use("/article",Article)
app.use("/public",PublicArt)
//定义错误捕捉
app.use((err,req,res,next)=>{
    
    // 验证失败导致错误
    if(err instanceof joi.ValidationError){
        res.Error(err.message)
    }
    if(err.name==='UnauthorizedError'){
        res.Error("token验证失败")
    }

     // 未知错误
    res.send({
        status:1,
        ii:0,
        msg:err.message
    })
    // 未知错误
    // res.Error(err.message)
    next()
})

// 启动服务器

app.listen(3007,function(){
    console.log("http://127.0.0.1:3007");
})