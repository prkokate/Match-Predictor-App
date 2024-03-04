require("dotenv").config()
const mongoose=require("mongoose")
const MongoURI=process.env.MongoURI


const MongooseConnect=()=>{

    mongoose.connect(MongoURI).then(()=>{
        console.log("Connected to MongoDB!");
    }).catch((err)=>{
        console.error(`Error connecting to MongoDB: ${err}`);
    })
}

module.exports=MongooseConnect