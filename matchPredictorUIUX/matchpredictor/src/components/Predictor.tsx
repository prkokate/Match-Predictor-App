import React, { useContext, useEffect } from 'react'
import './Predictor.css'
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


export default function Predictor() {
  const {matchResult}:any=useContext(PredictionContext)
 
  return (
    <div className='predictor-container'>
      <div className="predictor-div">
        <div className="round-date-stats">

        <h2 className='match-round' >{matchResult.round}</h2>
        <p className="day-date">{matchResult.date.slice(0,10)} ({matchResult.day})</p>
        </div>

        <div className="prediction-stats">
        <div style={{color:matchResult.result?"green":"red"}} className="team-data-div">
            <div style={{borderColor:matchResult.result?"green":"red"}} className="result-border team-result">
            <img className='logo-img' src="https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" alt="" />
            </div>
            <h3  className='team-name' >{matchResult.team}</h3>
            <p className='home-away' >({matchResult.venue})</p>
        </div>
        <div style={{color:matchResult.result?"red":"green"}} className="opponent-data-div">
            <div style={{borderColor:matchResult.result?"red":"green"}} className="result-border opponent-result">
                <img className='logo-img' src="https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" alt="" />
            </div>
            <h3  className='team-name' >{matchResult.opponent}</h3>
            <p className='home-away' >({matchResult.venue==="Home"?"Away":"Home"})</p>
        </div>
        </div>

       { matchResult.result?<p className="description"> {matchResult.team} has stronger chances of winning over {matchResult.opponent}!</p>
        :<p className="description"> {matchResult.team} has stronger chances of winning over {matchResult.opponent}!</p>}
        
      </div>
    </div>
  )
}
