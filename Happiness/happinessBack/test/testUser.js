const User = require('../models/User');
const assert = require('assert');
const { find } = require('../models/AvisClients');

describe(' crud  user', () => {
    it('user créé ', () => {
        const test = new User({
            name: 'testName',
            email: 'test@email.fr',
            password: 'testpassword',
        });
        console.log(test);
        test.save().then(() => {
            assert(test.isNew);
            done();
        })
    })
    it("user update", () => {
        const user = User.findOneAndUpdate({ name: 'testName2' }).lean()
        user.then(() => {
            assert(user.name === 'testName2')
        })
    })
    it('user effacé ', () => {
        const user = User.findOneAndDelete({ name: "testName" }).lean()
        user.then(() => {
            assert(user.name === 'testName')
        });
    })
})




