var mongoose=require("mongoose");
var Schema = mongoose.Schema;

let MatchSchema=new Schema({
    team:{
        type:String,
        required:true
    },
    opponent:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    comp:{
        type:String,
        required:true
    },
    round:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    result:{
        type:String
    },
    formation:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('match',MatchSchema);