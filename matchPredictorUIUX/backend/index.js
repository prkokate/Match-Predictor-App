const express=require("express")
const app=express();

const cors=require("cors")
app.use(express.json())
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');






app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

const MongooseConnect=require("./db")
MongooseConnect();

const port=8000
app.get("/",(req,res)=>{
  res.json("Server started")
})

// app.use("/api/auth/",require("./routes/auth"));
app.use("/api/matches/",require("./routes/matches"));

app.listen(port,()=>{
  console.log("Server started at port",port);
})