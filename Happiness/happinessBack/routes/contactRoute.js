const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

require('dotenv').config();
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_HOST = process.env.EMAIL_HOST

let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
 
}); 

router.post("/register", async (req,res) =>{
    const { nom, prenom, email, question, message } = req.body;
    let newcontact = new Contact({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        question:req.body.question,
        message: req.body.message,
    })
    newcontact.save().then()
    const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER,
        subject: `${question}`,
        html: `Vous avez un nouveau message de  <br>
        Nom: ${nom}<br>
        Prénom:${prenom}<br>
        Email : ${email}<br>
        Question:${question}<br>
        Message: ${message}<br>`,
    };
    transporter.sendMail(mailOptions, (error, responose) => {
        if (error){
            console.log(error);
            res.status(500)
            .json({ message: error.message, status: 500 })
        }else {
            res.status(201)
            .json({ message: " l'email à bien été envoyer " })
        }
    })
} )

router.get("/", async (req, res) => {
    try {
        const contactList = await Contact.find().sort("-createdAt");
        // console.log(contactList);
        return res.status(200).json(contactList);
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(400).json({ status: 400, message: "ce message n'existe pas" })
        }
        //Si on veut que seul l'auteur puisse supprimer son article, c'est ici qu'il faut mettre  une condition de test
        await contact.remove();
        return res
            .status(200).json({ status: 200, message: "message supprimé" })
    } catch (error) {
        res.status(500).json(error.message)
    }
})








module.exports = router;






