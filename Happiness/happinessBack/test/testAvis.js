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


describe('avisclients crud', () => {
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
        await test.save().then(() => {
            assert.equal(test.description, "testdescription");
        })
    })
    it("avisclients update", () => {
         const avisclients = AvisClients.findOneAndUpdate({ userName: 'testAvis' }).lean()
         avisclients.then(() => {
             assert(avisclients.name === 'testAvis')
         })
     })
     it('avisclients effacé ', () => {
         const avisclients = AvisClients.findOneAndDelete({ name: "testName2" }).lean()
         avisclients.then(() => {
             assert(avisclients.name === 'testName2')
         });
     })
})
