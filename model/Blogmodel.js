const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type: String,
    },
    subTitle:{
        type: String,
    },
    description:{
        type: String
    }
},{
    timestamps : true
})
const blog = mongoose.model("blog", blogSchema)
module.exports = blog