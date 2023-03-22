require("dotenv").config();
const express = require("express"); //framework qui nous aide a construire notre backEnd
const mongoose = require("mongoose"); //pour nos models avec mongodb
const nodemailer = require('nodemailer')// pour pouvoir envoyer des emails 
const cors = require('cors');  // cors= Cross-origin resource sharing pour configurer les requettes http 
const app = express();
const bodyParser = require('body-parser'); // pour pouvoir lire les requettes qui nous sont envoyer
const router = express.Router();
const helmet = require("helmet"); // pour nous proteger de diferrentes attaque.
// ici on apelle  et on configure ce dont nous avons besoin 
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const MONGO_URI = process.env.MONGO_URI;
mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(() => console.log("La connexion à la BDD est établie"))
    .catch((error) => console.log(error))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(function (req, res, next) {
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

const avisClientsRoute = require("./routes/avisClientsRoute");
app.use("/avisclients", avisClientsRoute);

const contactRoute = require("./routes/contactRoute");
app.use("/contact", contactRoute)

app.use("/", router)
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Le serveur est à l'écoute sur le port ${PORT}`));

