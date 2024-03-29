const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth");
const AvisClients = require("../models/AvisClients");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY

//------------------------création d'un user ou inscription-------------------------//
router.post ("/register", async (req, res) => {
   try {
        const searchUser = await User.findOne({ email: req.body.email });
        if (searchUser) {
            console.log("utilisateur existant")
            return res
                .status(403)
                .json({ message: `L'utilisateur ${searchUser.email} existe déjà`, 
                status: 403 });
        }
        const user = new User(req.body);
        const newUser = await user.save();
        console.log("création réussie");
        return res
            .status(201)
            .json({ message: `l'utilisateur ${newUser.name} a été créé`,
             status: 201 });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message, status: 500 })
    }
}
);
//-----------------------------------connexion---------------------------//
router.post("/login", async (req, res) => { 
    try {
        //dans le body on va retrouver email et mdp
        //! récupérer l'utilisateur grace a son email
        //! verifier si il existe
        //! vérifier le mdp
        const user = await User.findOne({name: req.body.name });
        if (!user) {
            return res.status(400).json({ message: "cet utilisateur n'existe pas",
             statut: 400 })
        }
         const isMatch = await bcrypt.compare(req.body.password, user.password);
        //  console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: "mot de passe incorrect", status: 400 })
        }
        // on inscrit les infos qu'on a besoins dans dans une constante
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }
        // on enregistre les données et elle sont chiffrée en token
        // pour pouvoir les réutiliser plus tard.
        const token = jwt.sign(payload,PRIVATE_KEY, { expiresIn: '2hours' });  
        return res
            .status(200)
            .json({
                message: {
                    token: token,
                    user: {
                        name: user.name,
                        email: user.email,
                        admin: user.isAdmin,
                        userId: user._id
                    }
                }
            })
    }
    catch (error) {
        return res
            .status(500)
            .json(error.message)
    }
})
router.get("/",auth,async (req, res) => {
    try {
        const userList = await User.find().sort("-createdAt");
        // console.log(userList);
        return res.status(200).json(userList);

    }
    catch (error) {
        return res.status(500).json(error.message)
    }
})

router.get("/:id",auth, async (req, res) => {
    try {
        
        const userId = await User.findById(req.params.id)
       
        if (!userId) {
            
            return res.status(400).json({ message: "cet utilisateur n'existe pas", statut: 400 })
        }
        else {
            res.status(200).json({ status: 200, result: userId })
        }
    }
    catch (error) {
        res.status(500).json(error.message)

    }
})


router.put("/update/:id",auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ status: 400, message: "l'utilisateur n'existe pas", statut: 400 })
        }

        await user.updateOne(req.body);
        return res.status(200).json({ message: " l'utilisateur à bien été modifié " })

    }
    catch (error) {
        res.json(error.message)
    }

})

router.delete("/delete/:id",auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ status: 400, message: "cet utilisateur n'existe pas" })
        }
        //Si on veut que seul l'auteur puisse supprimer son articl, c'est ici qu'il faut mettre  une condition de test
        
        await AvisClients.deleteMany({ author: req.params.id }) // PERMET DE SUPPRIMER LE COMMENTAIRE LIÉ A L'ARTICLE
        await user.delete();
        return res
            .status(200).json({ status: 200, message: "utilisateur supprimé" })
    } catch (error) {
        res.status(500).json(error.message)
    }
})








module.exports = router;