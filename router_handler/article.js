const { decodeBase64 } = require("bcryptjs")
const db=require("../mysql/index")

//获取文章列表分类数据
exports.getArtList=(req,res)=>{
    let sql='select * from article where is_delete=0 order by id asc'
    db.query(sql,(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        res.send({
            status:0,
            msg:"获取文章分类数据成功",
            data:results
        })
    })
}
//新增文章分类
exports.addArtList=(req,res)=>{
    let artinfo=req.body
    let sql1='select * from article where name=? or alias=?'
    db.query(sql1,[artinfo.name,artinfo.alias],(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        //判断文章名称或者别名是否存在
        if(results.length===2){
            return res.Error("文章名称和别名均已存在",0)
        }
        if(results.length===1 && results[0].name===artinfo.name && results[0].alias===artinfo.alias){
            return res.Error("文章名称与别名均存在",0)
        }
        if(results.length===1 && results[0].nam===artinfo.name){
            return res.Error("文章名称存在",0)
        }
        if(results.length===1 && results[0].alias===artinfo.alias){
            return res.Error("文章别名存在",0)
        }
        let sql2='insert into article set ?'
        db.query(sql2,artinfo,(err,results)=>{
            if(err){
                return res.Error(err.message)
            }
            if(results.affectedRows!==1){
                return res.Error("添加失败",0)
            }
            res.send({
                status:0,
                msg:"添加成功"
            })
        })

    })
}
//删除文章(采用标记删除)
exports.deleteArticle=(req,res)=>{
    let sql='select * from article where id=?'
    db.query(sql,[req.params.id],(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.length!==1){
            return res.Error("删除失败,查询不到此书")
        }
        let updSql='update article set is_delete=1 where id=?'
        db.query(updSql,[req.params.id],(err,results)=>{
            if(err){
                return res.Error(err.message)
            }
            if(results.affectedRows!==1){
                return res.Error("删除失败")
            }
            res.send({
                status:0,
                msg:"删除成功"
            })
        })
    })
}
//查询文章
exports.selectArticle=(req,res)=>{
    let sql="select * from article where id=?"
    db.query(sql,[req.params.id],(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.length!==1){
            return res.Error(err.message)
        }
        res.send({
            status:0,
            msg:"查询成功",
            data:results[0]
        })
    })
}
//更新文章信息
exports.updateArticle=(req,res)=>{
    let articleinfo=req.body
    let sql='select * from article where id<>? and (name=? or alias=?)'
    db.query(sql,[articleinfo.id,articleinfo.name,articleinfo.alias],(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        //检查更新的名字和别名是否存在
        if(results.length===2){
            return res.Error("文章名和文章别名均已存在，请重新输入")
        }
        if(results.length===1 && results[0].name===articleinfo.name && results[0].alias===articleinfo.alias){
            return res.Error("文章名和文章别名均已存在，请重新输入")
        }
        if(results.length===1 && results[0].name===articleinfo.name){
            return res.Error("文章名已存在，请重新输入")
        }
        if(results.length===1 && results[0].alias===articleinfo.alias){
            return res.Error("文章别名已存在，请重新输入")
        }

        //定义更新文章sql语句
        const updSql='update article set ? where id=? and is_delete=0'
        db.query(updSql,[articleinfo,articleinfo.id],(err,results)=>{
            if(err){
                return res.Error(err.message)
            }
            if(results.affectedRows!==1){
                return res.Error("更新失败")
            }
            res.send({
                status:0,
                msg:"更新成功"
            })
        })
    })
}