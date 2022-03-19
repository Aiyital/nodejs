//导入数据库
const db=require("../mysql/index")

exports.publicArticle=(req,res)=>{
    let artInfo=req.body
    let sql='select * from manage_article where id=?'
    db.query(sql,artInfo.id,(err,results)=>{
        if(err){
            return res.Error(err.message)
        }
        if(results.length>0){
            return res.Error("此文章编号已经存在，请重新定义")
        }
        let Inssql="insert into manage_article set?"
        db.query(Inssql,[artInfo,artInfo.id],(err,results)=>{
            if(err){
                return res.Error(err.message)
            }
            if(results.affectedRows!==1){
                return res.Error("发布失败")
            }
            res.send({
                status:0,
                msg:"发布成功"
            })
        })
    })
}

    