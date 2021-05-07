const UserModel = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

async function register(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userInctance = new UserModel({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashedPassword
        })
        await userInctance.save()
        const token = jwt.sign({ id: userInctance._id }, config.secret);
        res.status(200).send({ auth: true, token: token, userId: userInctance._id });
    }
    catch (error) {
        return res.status(500).send({ auth: false, message: error.message });
    }
}
module.exports = {
    register
}