const express=require('express');
const bodyParser = require('body-parser')
const cors =require('cors'); 


const app = express();
app.use(express.json());
app.use (cors());


const subscribers ={};


app.get("/subscribe",(req,res) =>{
    let  id= Math.ceil(Math.random() * 10000);
    console.log('\x1b[32m%s\x1b[0m',`user  ${id} is now subscribed`);
    const header = {
        "Content-Type":"text/event-stream",
        "Cache-Control":"no-cache",
        Connection:"keep-alive",
    }
    
    res.writeHead(200,header);
    subscribers[id] = res;
    
})

app.post("/messageSubscribers",(req,res) =>{
    const { body }=req;
    console.log(subscribers);
    // console.log(body);
   Object.keys(subscribers).forEach((subID)=> {
    subscribers[subID].write(`data: ${JSON.stringify(body)}\n\n`);
   });
   res.status(204).end();
})



const server = app.listen(3000,(err)=>{
    if (!err) console.log('\x1b[32m%s\x1b[0m','Server was started on port 3000');
});


