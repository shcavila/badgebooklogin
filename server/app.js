const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


//routes
const userRoute = require('../routes/user.route')

//DB
const config = require('./DB')
    
mongoose.Promise = global.Promise;

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database is connected')
    },
    err => {
       console.log('Can not connect to the database' + err)
    }
);


app.use(cors())




app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/user",userRoute)

app.post("/fullsignup", (req, res) => {
    console.log(req.body)
})

// app.post("/user/checkusername", (req, res) => {
//     var user = "rivas"
//     if (user == req.body.username) {
//         res.status(200).end("username already used!")
//     } else {
//         console.log(req.body)
//         res.status(200).end("success")
//     }
// })


// app.post("/user/signup", (req, res) => {
//     var  user = {
//         username: req.body.username,
//         password: req.body.password
//     }
//     console.log(req.body)
//     res.status(200).end("successful")
// })

// app.get("/user/signedup", (req, res) => {
//     console.log("hello")
//     // var data = user
//     // if (data.username != '') {
//     //     res.status(200).send(data)
//     // } else {
//     //     res.status(401).end("error")
//     // }
//     // user.username = ''
//     // user.password = ''
// })

app.listen(process.env.PORT || 8081)
console.log("app listening on post 8081")