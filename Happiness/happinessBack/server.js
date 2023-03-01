require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer')
const cors = require ('cors');
const app = express();
const bodyParser = require('body-parser');
const router=express.Router ();
const helmet = require("helmet");


app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const MONGO_URI = process.env.MONGO_URI;
mongoose
.set('strictQuery', false)
.connect(MONGO_URI)
.then(()=>console.log("La connexion à la BDD est établie"))
.catch((error) => console.log(error))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(function(req, res, next) {
    req.header("Content-Type: application/x-www-form-urlencoded");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", " GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, authorization");
    
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    
    next();
    })

app.use(helmet());
//-------------------routes pour les chemins d'acces a la routes web-------------

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const commentRoute= require("./routes/commentRoute");
app.use("/comment", commentRoute);

const avisClientsRoute= require("./routes/avisClientsRoute");
app.use("/avisclients", avisClientsRoute);

const contactRoute = require("./routes/contactRoute");
app.use("/contact", contactRoute)

app.use("/",router)
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Le serveur est à l'écoute sur le port ${PORT}`));