const {getSchedule}=require('../controllers/matches')
//const fetchNewMatches=require('../controllers/pythonApi').default
const Match=require('../models/Match')


const mockData=[
  {
    "_id": "65e54942d8bfbb65abb8d091",
    "team": "Liverpool",
    "opponent": "Manchester City",
    "date": "2024-03-10T00:00:00.000",
    "time": "15:45",
    "comp": "Premier League",
    "round": "Matchweek 28",
    "day": "Sun",
    "venue": "Home",
    "result": null,
    "formation": "4-3-3",
    "__v": 0
  },
  {
    "_id": "65e54942d8bfbb65abb8d094",
    "team": "Manchester City",
    "opponent": "Liverpool",
    "date": "2024-03-10T00:00:00.000",
    "time": "15:45",
    "comp": "Premier League",
    "round": "Matchweek 28",
    "day": "Sun",
    "venue": "Away",
    "result": null,
    "formation": "3-2-4-1",
    "__v": 0
  }
]

jest.mock('../models/Match')

jest.mock('../controllers/matches',()=>({
  fetchNewMatches: jest.fn((x,{})=>mockData)
}))


const req={}
const res={
  status: jest.fn((x)=>x),
  json: jest.fn((x)=>x)
}
it("Schedule present in database (status:200)",async()=>{
  Match.find.mockImplementationOnce(()=>(mockData))
  await getSchedule(req,res);
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledTimes(1)
})


it("Fetch new schedule from python API",async()=>{
  Match.find.mockImplementationOnce(()=>(undefined))
 // Match.create.mockResolvedValueOnce(mockData)
 await getSchedule(req,res);
 expect(res.status).toHaveBeenCalledWith(200)
 console.log(res.json)
 //expect(res.json).toHaveBeenCalledTimes(1)
})