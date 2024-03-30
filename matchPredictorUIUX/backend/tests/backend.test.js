const {getSchedule,updateSchedule,predictMatch}=require('../controllers/matches')
const {sum}=require('../controllers/pythonApi')
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

jest.mock('../models/Match', ()=> ({
  create:jest.fn(),
  find:jest.fn(),
  deleteMany:jest.fn(),
  findById:jest.fn((id)=>{return mockData.filter((match)=>match._id==id)[0]}),
  updateOne:jest.fn()

}))

// jest.mock('../controllers/matches')

const mockFunc={ 
  mockFetchMatches :jest.fn(async()=>mockData),
  predictFromApi:jest.fn(async()=>{return Math.floor(Math.random()*3)}),
}


let req={}
const res={
  status: jest.fn((x)=>x),
  json: jest.fn((x)=>x)
}

it("sum",()=>{
  var a=2;
  var b=1;
  expect(sum(a,b)).toBe(a+b);
})

describe("Match schedule fetchecing",()=>{


it("Schedule present in database (status:200)",async()=>{
  Match.find.mockImplementationOnce(()=>(mockData))
  await getSchedule(req,res,mockFunc.mockFetchMatches);
  expect(res.status).toHaveBeenCalledWith(200)
  //expect(res.json).toHaveBeenCalledTimes(1)
})


it("Fetch new schedule from python API",async()=>{
  Match.find.mockImplementationOnce(()=>([]))
 // Match.create.mockResolvedValueOnce()
 await getSchedule(req,res,mockFunc.mockFetchMatches);
 expect(res.status).toHaveBeenCalledWith(200)
 expect(Match.create).toHaveBeenCalledTimes(mockData.length);
 mockData.forEach((data, index) => {
      expect(Match.create).toHaveBeenCalledWith(data);
   });
 //expect(res.json).toHaveBeenCalledTimes(1)
})


})


describe("Update schedule",()=>{

  it("Update schedule (Delete previous schedule)",async()=>{
    await updateSchedule(req, res);
    expect(Match.deleteMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
   // expect(res.json).toHaveBeenCalledTimes(1)
  })

})

describe("Predicting the match",()=>{

  it("Predict",async()=>{
    req.body={_id:"65e54942d8bfbb65abb8d094"};
    await predictMatch(req, res, mockFunc.predictFromApi);
    req={}
    expect(res.status).toHaveBeenCalledWith(200);
    expect(Match.updateOne).toHaveBeenCalledTimes(1);
    expect(Match.findById).toHaveBeenCalledTimes(1)
    
  })

})