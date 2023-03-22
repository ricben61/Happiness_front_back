const AvisClients = require('../models/AvisClients');
const assert = require('assert');
const User = require('../models/User');
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
mongoose
    .set('strictQuery', false)
    .connect(MONGO_URI)
    .then(() => console.log("La connexion à la BDD est établie"))
    .catch((error) => console.log(error))
// j'ai copier coller la connection a la base de données 
// pour que le test se connect a la bdd

describe('avisclients crud', () => {
//  je créer un client fictif car dans mes avis clients   
    it(' avis-client crée ', async() => {
        const user = new User({
            name: "",
            email: "",
            password: "",
            isAdmin: "",
        })
        const test = new AvisClients({
            author: user,
            userName: 'testName',
            description: 'testdescription',
        });
 // je sauvegarde dans la bdd exactement comme dans la méthode post
        await test.save().then(() => {
            assert.equal(test.description, "testdescription");
        })
    })
    it("avisclients update", () => {
        // on cherche et on modif notre avis client 
         const avisclients = AvisClients.findOneAndUpdate({ userName: 'testName' }).lean()
         avisclients.then(() => {
             assert(avisclients.name === 'testAvis')
         })
     })
    //  on efface maintenant l'avis client pour qu'il ny est plus rien dans la bdd
     it('avisclients effacé ', () => {
         const avisclients = AvisClients.findOneAndDelete({ userName: "testAvis" }).lean()
         avisclients.then(() => {
             assert(avisclients === undefined)
         });
     })
})
