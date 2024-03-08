import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import './Schedule.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PredictionContext from '../context/PredictionContext'

type matchResult={
	team:String,
	opponent:String,
	result:Number,
	date: String,
	round:String,
	day:String,
	venue:String
}

type matchData={
	team: String,
	opponent: String,
	date: String,
	time: String,
	comp: String,
	round: String,
	day: String,
	venue: String,
	result: Number,
	formation: String
}
export default function Schedule() {

    const navigate= useNavigate();
	const {setMatchResult}:any=useContext(PredictionContext);
	const predict=(match:any)=>{
		axios.post('http://localhost:8000/api/matches/predictions',match
	).then((result:any)=>{
	  console.log(result.data)

	  let matchresult:matchResult={
		"team":match.team,
		"opponent":match.opponent,
		"result":result.data,
		"date": match.date,
	   "day":match.day,
	   "round":match.round,
	   "venue":match.venue
	}

	  setMatchResult(matchresult)

	  var matchres=JSON.stringify(matchresult)

	localStorage.setItem("match-prediction",matchres);

	  navigate("/Prediction")
	}).catch((err)=>{
	  console.log(err);
	})
	}

 

const handleChange=(e:any)=>{
	setsearch(e.target.value);
	let temp=matches.filter((match:matchData)=>{				
		return e.target.value!==""?match.team.toLowerCase().includes(e.target.value.toLocaleLowerCase()):match
	})

	if(e.target.value!==""){
		setsearchcnt(temp.length)
	}
	else{
		setsearchcnt(0);
	}

}



useEffect(()=>{
	// Fetch data from API
	axios.get("http://localhost:8000/api/matches/schedule")
	.then((schedule:any)=>setmatches(schedule.data))
	.catch((err)=>console.log(err))
	
},[])

const[matches,setmatches]=useState([]);
const [search,setsearch]=useState("");
const [searchcnt,setsearchcnt]=useState(0);
const [curmonth,setmonth]=useState(new Date().getMonth());

  return (
    <div className='schedule-container'>
		<div className="search-div">
		<h3 className='schedule-heading' >Premier League Predictor</h3>
		
		<div className="input-div">
		<button onClick={()=>{setmonth(curmonth-1)}} disabled={curmonth===new Date().getMonth()} className='toggle-month' >&larr; Prev month</button>
		<input value={search} onChange={handleChange} className='search-bar' placeholder='Search by team name, round' type="text" />
		<button onClick={()=>{setmonth(curmonth+1)}} disabled={curmonth===new Date().getMonth()+1} className='toggle-month' >Next month &rarr;</button>
		</div>
		{searchcnt!==0?<p className='total-results' >Total results: {searchcnt}</p>:null}
		</div>
        {
			searchcnt===0 && search!=="" ?( <h2 className='no-results' > No results found for '{search}'</h2> ):
            matches?matches.filter((match:matchData)=>{
				// console.log("-"+((curmonth.getMonth()+1)<"10"?"0":"") +String(curmonth.getMonth()+1)+"-")
				return search!==""?match.team.toLowerCase().includes(search.toLocaleLowerCase()):
				match.date.slice(0,10).includes("-"+(curmonth+1)<"10"?"0"+String(curmonth+1)+"-":+String(curmonth+1)+"-")
			})
			.map((match:matchData,i)=> { 
				
                return <div key={i} className='match-card'>
                    <div className="match-info">
						<h3>{match.team} Vs {match.opponent}</h3>
						<p>{match.date.slice(0,10)} @ {match.time}</p>
						<p>venue: {match.venue==="Home"?match.team:match.opponent}  </p>
					</div>
					<div className="logo-round-div">
						<div className="logo-div">
						<img className='logo' src="https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" alt="" />
						VS
						<img className='logo' src="https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" alt="" />
						</div>
						{match.round}
					</div>
					<div className="predict-div">
						<button key={i} onClick={()=>predict(match)} className='predict-btn' >See prediction</button>
					</div>
                </div>
                }
                ):null
        }
      
    </div>
  )
}
