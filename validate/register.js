const joi=require("joi")

const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().pattern(/^[\S]{6,16}$/).required()

//更改个人信息
const id=joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email=joi.string().email().required()
// 更新头像
const user_pic=joi.string().dataUri().required()

exports.register_validate={
    body:{
        username,
        password
    }
}
exports.baseInfo={
    body:{
        id,
        nickname,
        email
    }
}
exports.selectInfo={
    body:{
        id
    }
}
exports.validatePwd={
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.updateAvater={
    body:{
        user_pic
    }
}