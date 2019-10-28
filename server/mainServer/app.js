const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const app = express()
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

const userRoute = require("../routes/forTesting");
//const userRoute = require('../routes/user.route');

const config = require("./DB");

// mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

mongoose
    .connect('mongodb+srv://badgebookdb:badgebookdb2019@cluster0-pn3a6.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("CONNECTION ERROR!");
    });

// mongoose.connect('mongodb+srv://badgebookdb:badgebookdb2019@cluster0-pn3a6.mongodb.net/test?retryWrites=true&w=majority', {
//   useNewUrlParser: true
// });

// mongoose.connect(config.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(
//     () => {
//         console.log("Database is connected")
//     },
//     err => {
//        console.log("Can not connect to the database" + err)
//     }
// );

app.use(cors())




app.use("/user", userRoute)

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(process.env.PORT || 8081)
console.log("app listening on post 8081")