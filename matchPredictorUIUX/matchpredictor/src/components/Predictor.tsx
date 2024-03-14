import { useContext} from 'react'
import './Predictor.css'
import PredictionContext from '../context/PredictionContext'

// type matchResult={
// 	team:String,
// 	opponent:String,
// 	result:Number,
// 	date: String,
//   round:String,
// 	day:String,
// 	venue:String
// }


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
        <div style={{color:matchResult.result==2?"green":matchResult.result==1?"red":"yellow"}} className="team-data-div">
            <div style={{borderColor:matchResult.result==2?"green":matchResult.result==1?"red":"yellow"}} className="result-border team-result">
            <img className='logo-img' src={`/assets/teamLogos/${matchResult.team.replace(" ","-")}.png`} alt="" />
            </div>
            <h3  className='team-name' >{matchResult.team}</h3>
            <p className='home-away' >({matchResult.venue})</p>
        </div>
        <div style={{color:matchResult.result==2?"red":matchResult.result==1?"green":"yellow"}} className="opponent-data-div">
            <div style={{borderColor:matchResult.result==2?"red":matchResult.result==1?"green":"yellow"}} className="result-border opponent-result">
                <img className='logo-img' src={`/assets/teamLogos/${matchResult.opponent.replace(" ","-")}.png`} alt="" />
            </div>
            <h3  className='team-name' >{matchResult.opponent}</h3>
            <p className='home-away' >({matchResult.venue==="Home"?"Away":"Home"})</p>
        </div>
        </div>

       { matchResult.result==2?<p className="description"> {matchResult.team} has stronger chances of winning over {matchResult.opponent}!</p>
        :matchResult.result==1?<p className="description"> {matchResult.opponent} has stronger chances of winning over {matchResult.team}!</p>
        :<p className="description"> Stats show strong possibility of a Draw!</p>
      }
        
      </div>
    </div>
  )
}
