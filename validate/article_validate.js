const joi=require("joi")

const name=joi.string().required()
const alias=joi.string().alphanum().required()
//定义id验证规则
const id=joi.number().integer().min(1).required()


exports.addArticle={
    name,
    alias
}
exports.ArticleId={
    id
}
exports.updateArt={
    id,
    name,
    alias
}