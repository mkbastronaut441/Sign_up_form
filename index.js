const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const exp = require('constants');
const { urlencoded } = require('body-parser');

const app=express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb');
const db=mongoose.connection

db.on('error',()=>{
    console.log("Error in Connecting to database");
})

db.once('open',()=>{
    console.log("Connected to database");
})

app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var mobile=req.body.mobile;
    var password=req.body.password;

    var data={
        "name":name,
        "email":email,
        "mobile":mobile,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Entry inserted successfully");
    });

    return res.redirect('signup_success.html')

})


app.get('/',(req,res)=>{
    res.set({
        "Allow-access-origin": '*'
    })
    return res.redirect('index.html')
})

app.listen(300,()=>{
    console.log('server is listening at http://localhost:300');
})