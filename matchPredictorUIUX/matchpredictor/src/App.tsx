import './App.css'
import { BrowserRouter as Router,
Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Schedule from './components/Schedule'
import Predictor from './components/Predictor'
import PredictionState from './context/PredictionState'

function App() {
  
//   axios.post('http://127.0.0.1:5000/predict',{
// 		"team":"Tottenham",
// 		"opponent":"West Ham",
// 		"date":"2022-04-23",
// 		"time":"18:00",
// 		"comp":"Premier League",
// 		"round":"Matchweek 35",
// 		"day":"Sun",
// 		"venue":"Home",
// 		"result":"",
// 		"formation":"4-3-3"
// 	}
// ).then((result:any)=>{
//   console.log(result.data["result"])
// }).catch((err)=>{
//   console.log(err);
// })





  return (
	<div className="app">
	<PredictionState>
    <Router>
	<Navbar />
	<Routes>
		<Route path='/' element={<Schedule />} />
		<Route path='/Prediction' element={<Predictor/>} />
	</Routes>
      
        
    </Router>
	</PredictionState>
	</div>
  )
}

export default App
