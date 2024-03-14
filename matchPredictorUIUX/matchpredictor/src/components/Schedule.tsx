import { useContext, useEffect, useState } from 'react'
import './Schedule.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PredictionContext from '../context/PredictionContext'
import Spinner from './Spinner'

type matchResult={
	team:String,
	opponent:String,
	result:Number,
	date: Date,
	round:String,
	day:String,
	venue:String
}

type matchData={
	team: String,
	opponent: String,
	date: Date,
	time: String,
	comp: String,
	round: String,
	day: String,
	venue: String,
	result: Number,
	formation: String
}
export default function Schedule() {

const [updateFlag,setUpdateFlag]:any=useState(localStorage.getItem("curDate"));
const[matches,setmatches]=useState([]);
const [search,setsearch]=useState("");
const [searchcnt,setsearchcnt]=useState(0);
const [curmonth,setmonth]=useState(new Date().getMonth());
const [loader,setloader]=useState(true);

    const navigate= useNavigate();
;
	const {setMatchResult}:any=useContext(PredictionContext);
	const predict=(match:any)=>{
		match.date=String(match.date).slice(0,10);
		setloader(true)
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
	setloader(false);

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




const month=["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]

useEffect(()=>{

	setloader(true);

	if(updateFlag!==String(new Date().getDate())){

		axios.delete("http://localhost:8000/api/matches/update-schedule")
		.then(()=>console.log("Schedule updated!"))
		.catch((err)=>console.log(err))

		setUpdateFlag(new Date().getDate());
		localStorage.setItem("curDate", String(new Date().getDate()));
	}

	// Fetch data from API
	axios.get("http://localhost:8000/api/matches/schedule")
	.then((schedule:any)=>{
		setmatches(schedule.data)
		setloader(false);
	})
	.catch((err)=>console.log(err))

	localStorage.removeItem("match-prediction");

	
	
},[])

  return (
	<div className="schedule-main">
    <div className='schedule-container'>
		<div className="search-div">
		<h3 className='schedule-heading' >Premier League Predictor</h3>
		
		<div className="input-div">
		<button onClick={()=>{setmonth(curmonth-1)}} disabled={curmonth===new Date().getMonth()} className='toggle-month' >&larr; {month[curmonth-1]}</button>
		<input value={search} onChange={handleChange} className='search-bar' placeholder='Search by team name, round' type="text" />
		<button onClick={()=>{setmonth(curmonth+1)}} disabled={curmonth===new Date().getMonth()+1} className='toggle-month' > {month[curmonth+1]}&rarr; </button>
		</div>
		{searchcnt!==0?<p className='total-results' >Total results: {searchcnt}</p>:null}
		</div>

		<Spinner loader={loader} />
        {
			searchcnt===0 && search!=="" && !loader ?( <h2 className='no-results' > No results found for '{search}'</h2> ):
            matches?matches.filter((match:matchData)=>{
				//console.log(new Date(match.date).getMonth())
				return search!==""?match.team.toLowerCase().includes(search.toLocaleLowerCase()) 
				|| match.opponent.toLowerCase().includes(search.toLocaleLowerCase())
				 :
				new Date(match.date).getMonth()===curmonth
			})
			.map((match:matchData,i)=> { 
				
                return <div key={i} className='match-card'>
                    <div className="match-info">
						<div className="team-names-div">
							<h3>{match.team}</h3>
							Vs
							<h3> {match.opponent}</h3>
						</div>
						<p>{String(match.date).slice(0,10)} @ {match.time}</p>
						<p>venue: {match.venue==="Home"?match.team:match.opponent}  </p>
					</div>
					<div className="logo-round-div">
						<div className="logo-div">
						<img className='logo' src={`/assets/teamLogos/${match.team.replace(" ","-")}.png`} alt="" />
						<p className='versus' >VS</p> 
						<img className='logo' src={`/assets/teamLogos/${match.opponent.replace(" ","-")}.png`} alt="" />
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
	</div>
  )
}
