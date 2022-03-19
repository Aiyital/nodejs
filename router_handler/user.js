// 导入数据库
const db=require("../mysql/index")
// 导入密码加密方法
const bcrypt=require("bcryptjs")
// 导入生成token的第三方模块
const jwt=require("jsonwebtoken")
// 导入秘钥配置文件
const config=require("../config/config")

//路由方法
exports.Register=(req,res)=>{
    let userinfo=req.body
    // if(!userinfo.username || !userinfo.password){
    //     return res.send("用户名或者密码不合法")
    // }
    let sql="select * from users where username=?"
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            return res.send({
                status:1,
                msg:err.message,
                num:1
            })
        }
        if(results.length>0){
            return res.Error("此用户名已存在，请重新定义用户名")
            // return res.send({
            //     status:1,
            //     msg:"此用户名已存在，请重新定义用户名"
            // })
        }
        else{
            userinfo.password=bcrypt.hashSync(userinfo.password,10)
            let sql2="insert into users set ?";
            db.query(sql2,{username:userinfo.username,password:userinfo.password},(err,results)=>{
                if(err){
                    return res.send({
                        status:1,
                        msg:err.message,
                        num:2
                    })
                }
                if(results.length>1){
                    return res.send({
                        status:1,
                        msg:"注册用户失败请稍后重试!"
                    })
                }
                res.send({
                    status:0,
                    msg:"注册成功"
                })
            })
        }
    })
}
exports.Login=(req,res)=>{
    let userinfo=req.body
    //查询数据库
    let sql='select * from users where username=?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.length!==1){
            return res.Error("登录失败")
        }
        // 验证密码是否正确
        let isTure=bcrypt.compareSync(userinfo.password,results[0].password)
        if(!isTure){
            return res.Error("密码错误")
        }
        
        // 在服务端生成token的字符串
        const user={
            ...results[0],
            password:"",
            user_pic:""
        }
        // 生成Token
        const tokenStr=jwt.sign(user,config.secretKey,{expiresIn:config.expiresIn})
        
        res.send({
            status:1,
            msg:"登录成功",
            token:"Bearer "+tokenStr
        })
        
    })

}
