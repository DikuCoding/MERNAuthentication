const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
// const UserModel = require("./models/Users")
const RegisterModel = require("./models/Register")
const bcrypt = require("bcrypt")  // For hashing password
const jwt = require('jsonwebtoken'); //token
const cookieParser = require("cookie-parser")  //cookie

const app = express()

// Enable CORS for all routes
app.use(cors({
    origin: ["https://mern-authentication-one.vercel.app"],   //for token
    methods: ["GET", "POST"],
    credentials: true

}))
app.use(express.json());
app.use(cookieParser());

// connecting to database
mongoose.connect(
    "mongodb+srv://MERNRegister:Universe123@cluster0.f3xfldb.mongodb.net/mernRegister?retryWrites=true&w=majority", {
        useNewUrlParser: true,
    // useCreateIndexParser: true,
    UseUnifiedTopology: true,
    // UseFindAndModify: false,
    }).then(()=>{
        console.log("Connection Successfull to database");
    }).catch((err)=>console.log("No connection"));

    //For Fetch data from Mongo db atlas and show it to react
    app.get("/getUsers",(req,res)=>{
        RegisterModel.find()
        .then(users =>res.json(users))
        .catch(err=> res.json)
    })


// app.get("/getUsers",(req,res)=>{
//     UserModel.find({}).then(function(users){
//         res.json(users)
//     }).catch(function(err){
//         res.json(err)
//     })
// })


app.listen(3001,()=>{
    console.log("Server is running")
})

//for Registration
app.post('/register', (req,res)=>{
    const {name,email,password} = req.body;
    //hasing the password
    bcrypt.hash(password, 10)
    .then(hash=>{

        RegisterModel.findOne({email: email})
        .then(user=>{
            if(user){
                res.json("Already have an account")
            }
            else{
                RegisterModel.create({name: name, email: email, password: hash})
                .then(result =>res.json("Account Created"))
                .catch(err=> res.json("Error"))
            }
        }).catch(err=>res.json(err))
    }).catch(err=> console.log(err.message))

})

//Creating login route
app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user=>{
        //Comparing the hashed password
        // bcrypt.compare(password, user.password, (err, response)=>{
        //     if(err) { 
        //         res.json("The password is incorrect")
        //     }
        //     if(res){
        //           res.json("Successfully Logged in")
        //         }
        // })
        if(user){
               //Comparing the hashed password
        bcrypt.compare(password, user.password, (err, response)=>{
            if(response){
                const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"})
                res.cookie("token", token);
                  res.json("Successfully Logged in")
                }
                else{
                    res.json("The password is incorrect");
                }
        })
        }
        else{
                res.json("No record registered")
        }
    })
})

//middleware creation
const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
    // console.log(token);
    if(!token){
        return res.json("The token was not available")
    }else{
        jwt.verify(token, "jwt-secret-key",  (err, decoded)=>{
            if(err) return res.json("Token is wrong")
            next();
        })  
    }
}

//For home routing
app.get('/home', verifyUser, (req,res)=>{
    return res.json("Successfully Logged in")
})

app.post('/forgot-password', (req,res)=>{
    const {email} = req.body;
    RegisterModel.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.send({Status: "User not existed"})
        }
        const token = jwt.sign({id: user._id}, "jwt-secret-key",{expiresIn: "1d"})

        //From nodemailer w3 school
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Reset your password',
            text: `http://localhost:3003/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"});
            }
          });
    })
})

//Reset Password
app.post('/reset-password/:id/:token', (req,res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt-secret-key", (err, decoded)=> {
        if(err){
            res.json({Status: "Error with token"})
        }else{
            bcrypt.hash(password, 10)  //hasing password and 10 is a salt i.e unique characters
            .then(hash =>{
                RegisterModel.findByIdAndUpdate({_id: id},{password: hash})
                .then(u =>res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))  
            })
            .catch(err => res.send({Status: err}))
        }
    })
})
