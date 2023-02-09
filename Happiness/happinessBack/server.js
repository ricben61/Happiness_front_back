require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer')
const cors = require ('cors');
const app = express();


app.use(cors())

const MONGO_URI = process.env.MONGO_URI;
mongoose
.set('strictQuery', false)
.connect(MONGO_URI)
.then(()=>console.log("La connexion à la BDD est établie"))
.catch((error) => console.log(error))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



//-------------------routes pour les chemins d'acces a la routes web-------------

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const commentRoute= require("./routes/commentRoute");
app.use("/comment", commentRoute);

const avisClientsRoute= require("./routes/avisClientsRoute");
app.use("/avisclients", avisClientsRoute);

const contactRoute = require("./routes/contactRoute");
app.use("/contact", contactRoute)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Le serveur est à l'écoute sur le port ${PORT}`));