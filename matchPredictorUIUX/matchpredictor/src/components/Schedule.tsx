import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import './Schedule.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PredictionContext from '../context/PredictionContext'

type matchResult={
	team:String,
	opponent:String,
	result:Number
}
export default function Schedule() {

    const navigate= useNavigate();
	const {setMatchResult}:any=useContext(PredictionContext);
	const predict=(match:any)=>{
		axios.post('http://127.0.0.1:5000/predict',match
	).then((result:any)=>{
	  console.log(result.data["result"])

	  let matchresult:matchResult={
		"team":match.team,
		"opponent":match.opponent,
		"result":result.data["result"]
	}

	  setMatchResult(matchresult)

	  var matchres=JSON.stringify(matchresult)

	localStorage.setItem("match-prediction",matchres);

	  navigate("/Prediction")
	}).catch((err)=>{
	  console.log(err);
	})
	}

  const data=[
    {
		"team":"Tottenham",
		"opponent":"West Ham",
		"date":"2022-04-23",
		"time":"18:00",
		"comp":"Premier League",
		"round":"Matchweek 35",
		"day":"Sun",
		"venue":"Home",
		"result":"",
		"formation":"4-3-3"
	},
    {
		"team":"Tottenham",
		"opponent":"West Ham",
		"date":"2022-04-23",
		"time":"18:00",
		"comp":"Premier League",
		"round":"Matchweek 35",
		"day":"Sun",
		"venue":"Home",
		"result":"",
		"formation":"4-3-3"
	},
    {
		"team":"Tottenham",
		"opponent":"West Ham",
		"date":"2022-04-23",
		"time":"18:00",
		"comp":"Premier League",
		"round":"Matchweek 35",
		"day":"Sun",
		"venue":"Home",
		"result":"",
		"formation":"4-3-3"
	},
    {
		"team":"Tottenham",
		"opponent":"West Ham",
		"date":"2022-04-23",
		"time":"18:00",
		"comp":"Premier League",
		"round":"Matchweek 35",
		"day":"Sun",
		"venue":"Home",
		"result":"",
		"formation":"4-3-3"
	},
    {
		"team":"Tottenham",
		"opponent":"West Ham",
		"date":"2022-04-23",
		"time":"18:00",
		"comp":"Premier League",
		"round":"Matchweek 35",
		"day":"Sun",
		"venue":"Home",
		"result":"",
		"formation":"4-3-3"
	},
    {
		"team":"Tottenham",
		"opponent":"West Ham",
		"date":"2022-04-23",
		"time":"18:00",
		"comp":"Premier League",
		"round":"Matchweek 35",
		"day":"Sun",
		"venue":"Home",
		"result":"",
		"formation":"4-3-3"
	}
]

const[matches,setmatches]=useState(data);

  return (
    <div className='schedule-container'>
        {
            data.map((match,i)=> { 
				
                return <div key={i} className='match-card'>
                    <div className="match-info">
						<h3>{match.team} Vs {match.opponent}</h3>
						<p>{match.date} @ {match.time}</p>
						<p>venue: {match.venue==="Home"?match.team:match.opponent}  </p>
					</div>
					<div className="predict-div">
						<button key={i} onClick={()=>predict(match)} className='predict-btn' >See prediction</button>
					</div>
                </div>
                }
                )
        }
      
    </div>
  )
}
