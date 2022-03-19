const joi=require("joi")

const id=joi.number().integer().min(1).required()
const title=joi.string().required()
const content=joi.string().required()
const pub_date=joi.date().required()

exports.validatePub={
    body:{
        id,
        title,
        content,
        pub_date
    }
}