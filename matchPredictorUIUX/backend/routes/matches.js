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


router.get('/schedule', async (req,res)=>{

    try{

        let prevSchedule=await Match.find()
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

module.exports=router

