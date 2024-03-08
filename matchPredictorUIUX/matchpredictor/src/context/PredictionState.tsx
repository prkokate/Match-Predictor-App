import { useState } from "react";
import PredictionContext from "./PredictionContext";


const PredictionState=(Props:any)=>{
    //console.log(localStorage.getItem("match-prediction"))
    let match:any=localStorage.getItem("match-prediction");
    if(match){
     match=JSON.parse(match)
    }
    const [matchResult,setMatchResult]=useState(match?match:{team:"",opponent:"",result:-1,date: "",time: "",})
    return (
        <PredictionContext.Provider value={{matchResult,setMatchResult}} >
              {Props.children}
          </PredictionContext.Provider>
      )
}

export default PredictionState