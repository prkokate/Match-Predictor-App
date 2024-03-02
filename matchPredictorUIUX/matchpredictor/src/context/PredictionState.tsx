import { useState } from "react";
import PredictionContext from "./PredictionContext";


const PredictionState=(Props:any)=>{
    //console.log(localStorage.getItem("match-prediction"))
    let match:any=localStorage.getItem("match-prediction");
    if(match){
     match=JSON.parse(match)
    }
    const [matchResult,setMatchResult]=useState(match)
    return (
        <PredictionContext.Provider value={{matchResult,setMatchResult}} >
              {Props.children}
          </PredictionContext.Provider>
      )
}

export default PredictionState