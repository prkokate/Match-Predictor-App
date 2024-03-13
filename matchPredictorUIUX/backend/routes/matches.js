const express=require("express")
const router=express.Router();
let Match=require('../models/Match')
var request = require('request-promise'); 


const fetchNewMatches=async(array,requestBody)=>{
    let resposeAr=[]
    var options = { 
		method: 'GET',  

		// http:flaskserverurl:port/route 
		uri: 'http://127.0.0.1:5000/schedule',
        body:requestBody,
        json:true

		// Automatically stringifies 
		// the body to JSON 
		//json: true
	}; 

	var sendrequest = await request(options) 

		// The parsedBody contains the data 
		// sent back from the Flask server 
		.then(function (parsedBody) { 
			//console.log(parsedBody[0]);
            
			
			resposeAr=JSON.parse(parsedBody)
		}) 
		.catch(function (err) { 
			console.log(err); 
		});

        return resposeAr
}


const predictMatch=async(match)=>{
    let response=-1;
    var options = { 
		method: 'POST',  

		// http:flaskserverurl:port/route 
		uri: 'http://127.0.0.1:5000/predict',
        body:match,
        json:true

		// Automatically stringifies 
		// the body to JSON 
		//json: true
	}; 

	var sendrequest = await request(options) 

		// The parsedBody contains the data 
		// sent back from the Flask server 
		.then(function (parsedBody) { 
			//console.log(parsedBody[0]);
            
			
			response=parsedBody
		}) 
		.catch(function (err) { 
			console.log(err); 
		});

        return response["result"]
}


router.get('/schedule', async (req,res)=>{

    try{

        let prevSchedule=await Match.find().sort({'date': 1})
        //.sort({'date': -1}) //get all matches and sort by date in desc
     
        if(!prevSchedule || prevSchedule.length==0){
            prevSchedule=await fetchNewMatches(prevSchedule,{})
           //console.log(prevSchedule[0])

            prevSchedule.map(async(match,i)=>{
                await Match.create(match)
            })
        }

        res.json(prevSchedule)
    }
    catch(err){
        console.log("Error occurred while fetching new matches: "+err);
        res.status(500).json({"error": err})
    }


})


router.post("/predictions", async(req,res)=>{
    try {
        var matchData=req.body
        let curmatch=await Match.findById(matchData._id);
        let result=curmatch["result"];
        if(curmatch["result"]==null || curmatch["result"]==undefined){
            result=await predictMatch(matchData);
            await Match.updateOne({_id : curmatch._id},{$set:{ "result": result}});
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(400).send('error occured while predicting: '+error)
        console.log('error occured while predicting: '+error)
    }
})

router.delete("/update-schedule",async(req,res)=>{
    try{
        
        var dates=new Date().toISOString()
        dates=dates.setDate(dates.getDate()-1)
        var response=await Match.deleteMany({"date":{$lt:dates}})

          res.status(200).send("schedule updated!");
    }
    catch(err){
        console.log(err);
        return res.status(400).send(err);

    }
})

module.exports=router

