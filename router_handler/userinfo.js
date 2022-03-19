// 导入数据库
const db=require("../mysql/index")
//密码加密
const bcrypt=require("bcryptjs")

// 查询用户基本信息
exports.selectBaseInfomation=(req,res)=>{
    let userinfo=req.query
    // 定义sql语句
    let sql="select username,nickname,email,user_pic from users where id=?"
    db.query(sql,userinfo.id,(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.length!==1){
            return res.Error("查询失败")
        }
        res.send({
            status:0,
            msg:"查询成功",
            data:results[0]
        })
    })
}
//更新用户信息
exports.updateInfo=(req,res)=>{
    let sql='update users set ? where id=?'
    db.query(sql,[req.body,req.user.id],(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.affectedRows!==1){
            return res.Error("用户信息更新失败")
        }
        res.send({
            status:0,
            msg:"用户信息更新成功"
        })
    })
}
//更新密码
exports.updtaePwd=(req,res)=>{
//使用token后会存在一个req.user来存放用户信息

    //查询用户是否存在
    let sql="select * from users where id=?"
    db.query(sql,req.user.id,(err,results)=>{
        if(err){
            console.log("从前")
            return res.Error(err.message)
        }
        if(results.length!==1){
            return res.Error("查无此人")
        }
        let compareResult=bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult){
            return res.Error("旧密码与密码不一致，请重新输入")
        }
        // 给新密码加密
        let newPwd=bcrypt.hashSync(req.body.newPwd)
        let sql2='update users set password=? where id=?'
        db.query(sql2,[newPwd,req.user.id],(err,results)=>{
            if(err){
                return res.Error(err)
            }
            if(results.affectedRows!==1){
                return res.Error(err)
            }
            res.send({
                status:0,
                msg:"更新成功"
            })
        })

    })
}
//更换头像
exports.updateAvater=(req,res)=>{
    let sql='update users set user_pic=? where id=?'
    db.query(sql,[req.body.user_pic,req.user.id],(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.affectedRows!==1){
            return res.Error("用户头像更新失败")
        }
        res.send("用户头像更新成功")
    })
}