const express=require("express");
const cors =require("cors");
const mongoose = require("mongoose");
const port= process.env.PORT || 7000;

const app= express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://Maniph:Maniph@cluster0.zxxethc.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("DB is connected")
})

// mongoose.connect("mongodb://127.0.0.1:27017/connectedDB",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// },()=>{
//     console.log("DB is connected")
// })

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})
const User = new mongoose.model("User",userSchema)


app.post("/login",(req,res)=>{
    const{name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successfully",user:user})
            }else{
                res.send({message:"Password didn't match"})
            }

        }else{
            res.send({message:"user not registered"})
        }
    })
})
app.post("/register",(req,res)=>{
    const{name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User already Registered"})
        }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(error)
                }else{
                    res.send({message:"Successfully Registered now You can Login"})
                }
            })
        }
    })
  
})



app.listen(port,()=>{
    console.log("app is running at port 7000")

})
