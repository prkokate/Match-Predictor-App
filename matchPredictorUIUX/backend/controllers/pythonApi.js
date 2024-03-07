
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

module.exports= fetchNewMatches