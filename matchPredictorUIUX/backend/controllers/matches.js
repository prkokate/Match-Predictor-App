const Match=require('../models/Match')
var request = require('request-promise'); 



async function fetchNewMatches(array,requestBody){
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

async function getSchedule (req,res,fetchNewMatches){

    try{

        let prevSchedule=await Match.find()
        //.sort({'date': -1}) //get all matches and sort by date in desc
     
        if(!prevSchedule || prevSchedule.length==0){
            prevSchedule=await fetchNewMatches(prevSchedule,req.body)
           //console.log(prevSchedule[0])

            prevSchedule.map(async(match,i)=>{
                await Match.create(match)
            })
        }

        res.status(200)
        res.json(prevSchedule)

        return;
    }
    catch(err){
        console.log("Error occurred while fetching new matches: "+err);
        res.status(500);
        res.json({"error": err})
    }
}

async function updateSchedule (req,res){
    try{
        
        var dates=new Date()
        dates.setDate(dates.getDate()-1)
        dates=dates.toISOString()
        var response=await Match.deleteMany({"date":{$lt:dates}})

          res.status(200)
          res.json({message:"schedule updated!"});
    }
    catch(err){
        console.log(err);
        res.json(err);
        return res.status(400)

    }
}


async function predictMatch (req,res,predictMatchFromApi){
    try {
        var matchData=req.body
        let curmatch=await Match.findById(matchData._id);
        //console.log(curmatch)
        let result=curmatch["result"];
        if(curmatch["result"]==null || curmatch["result"]==undefined){
            result=await predictMatchFromApi(matchData);
           // console.log(result);
            await Match.updateOne({_id : curmatch._id},{$set:{ "result": result}});
        }

        res.status(200)
        res.json(result);

    } catch (error) {
        res.status(400)
        res.json('error occured while predicting: '+error)
        console.log('error occured while predicting: '+error)
    }
}




module.exports={getSchedule,updateSchedule,predictMatch};