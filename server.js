const express=require('express');
const bodyParser = require('body-parser')
const cors =require('cors'); 


const app = express();
app.use (cors());
app.get('/',function(req,res){
    res.send("<h1>hello world</h1>");
});



//route middleware
app.use('/',function serverLogs(req,res,next){
    console.log('\x1b[33m%s\x1b[0m',`${req.method} request was used on ${req.url} at ${new Date()}`);
    next();
});

//route middleware
app.use((err, req, res, next)=>{
    console.log(err);
    // if (res.headersSent) {
    //   return next(err)
    // }
    res.status(422).json({code:"UNPROCESSIBLE_ENTITY"})
    res.status(404).json({code:"NOT_FOUND"})
    res.status(500).json({code:"INTERNAL_SERVER_ERROR"})
    res.send("something went wrong.")
});
  

app.use(bodyParser.json());


const subscribers ={}

app.post("/subscribe",(req,res) =>{
    console.log("hi");
    const {id} =req.body;
    console.log('\x1b[32m%s\x1b[0m',`user  ${id} is now subscribed`);
    req.on('close',()=>delete subscribers[id]);
    subscribers[id] = res;
    console.log(subscribers);
    
})

app.post("/messageSubscribers",(req,res) =>{
    const { body }=req;
    console.log(body);
   Object.keys(subscribers).forEach((subID)=> {
    subscribers[subID].json(body);
    delete subscribers[subID];
   });
   res.status(204).end();
})


const server = app.listen(3000,(err)=>{
    if (!err) console.log('\x1b[32m%s\x1b[0m','Server was started on port 3000');
});


