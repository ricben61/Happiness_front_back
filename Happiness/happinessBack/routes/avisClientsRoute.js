const express = require("express");
const AvisClients = require("../models/AvisClients");
const router = express.Router();

const auth = require ("../middlewares/auth.js")





//création d'un avis client
router.post("/new-avisclients",auth, async (req, res) => {
    try {
        const avisclients = new AvisClients(req.body);
        // console.log(avisclients);
        const newavisclients = await avisclients.save();
        console.log("création réussie");
        return res
            .status(201)
            .json({ message: `Votre avis a bien été créé `, status: 201, article: newavisclients });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message, status: 500, })
    }
}
);








router.get("/", async (req, res) => {
    try {
        const AvisClientsList = await AvisClients.find().sort("-createdAt");
        res.status(200).json(AvisClientsList);
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})

router.get("/:id",auth, async (req, res) => {
    // console.log('coucou');
    try {
        const avisClients = await AvisClients.findById(req.params.id)
        if (!avisClients) {
            return res.status(400).json({ message: "cet avis n'existe pas", statut: 400 })
        }
        else {
            res.status(200).json({ status: 200, result: avisClients })
        }
    }
    catch (error) {
        res.status(500).json(error.message)

    }
})

router.put("/update/:id",auth,  async (req, res) => {
    try {
        await AvisClients.findByIdAndUpdate(req.params.id, {
            userName: req.body.userName,
            description: req.body.description
        })
        // console.log("coucou");
        res.status(200).json({ message: " l'avis client à bien été modifié " })
        if (!AvisClients) {
            return res.status(404).json({ status: 400, message: "l'avis client n'existe pas", statut: 400 })
        }
        // console.log(avisclients);
        // await AvisClients.findByIdAndUpdate(req.body);
        // console.log(req.body);
        // return res.status(200).json({message:" l'avis client à bien été modifié "})
    }
    catch (error) {
        res.json(error.message)
    }
})

router.delete("/delete/:id",auth, async (req, res) => {
   
   
    try {
        const avisclients = await AvisClients.findByIdAndDelete(req.params.id)
       
        if (!avisclients) {
            return res.status(404).json({ status: 400, message: "cet avis n'existe pas", statut: 400 })
        }
     
        return res.status(200).json({ message: " l'avis client à bien été supprimé " })

    }
    catch (error) {
        res.json(error.message)
    }

})






module.exports = router;