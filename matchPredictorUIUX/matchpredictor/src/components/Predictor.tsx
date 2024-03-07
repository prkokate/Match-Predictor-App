import React, { useContext, useEffect } from 'react'
import './Predictor.css'
import PredictionContext from '../context/PredictionContext'

type Result={
  team:String,
  opponent:String,
  result:Number
}
// type props={
//   result:Result
// }

export default function Predictor() {
  const {matchResult}:any=useContext(PredictionContext)
 
  return (
    <div className='predictor-container'>
      <h3>The winner is... {matchResult.result?matchResult.team:matchResult.opponent}</h3>
    </div>
  )
}
