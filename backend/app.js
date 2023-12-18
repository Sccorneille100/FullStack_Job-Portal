const express = require ("express");
const app = express ();
const mongooose = require ("mongoose");
const morgan = require ("morgan");
const bodyParser = require ("body-parser");
require ("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/Error");




//connection to database
mongooose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,   
    useFindAndModify:false,

}).then(()=> console.log("Sucessfully connected to the databse"))
.catch((err)=> console.log('err'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"5mb"}));
app.use (bodyParser.urlencoded({limit: "5mb", extended:true}));
app.use(cookieParser())
app.use(cors())

//use of routes
const router = require("./routes/authroutes")
app.get("/",  router);
//
app.use(errorHandler);

// port
const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`lisetening sucessfully port ${port}`);
})
