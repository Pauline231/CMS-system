const mongoose = require('mongoose')
exports.connectDB = async()=>{
    await mongoose.connect("mongodb+srv://Pauline236:Paulwreck01@cluster0.dbknxpb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
     console.log('database connected successfully')
}
