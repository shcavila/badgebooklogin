const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//routes
const userRoute = require('../routes/user.route');
const orgRoute = require("../routes/org.route");


app.use(cors());




app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/user",userRoute);

app.use("/org",orgRoute);



app.listen(process.env.PORT || 8081)
console.log("app listening on post 8081")