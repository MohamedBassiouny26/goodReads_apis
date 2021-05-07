const mongoose = require("mongoose");

const bcrypt = require('bcrypt')
const AdminSchema = new mongoose.Schema({
   
    adminName: { type: String, required: true },
   
    password: { type: String, required: true }
  
})

AdminSchema.pre('save', function (next) {
    const doc = this
    if (doc.isNew) {
        bcrypt.hash(doc.password, 10, (err, hashedText) => {
            doc.password = hashedText;
            next()
        })
    }
})

const AdminModel = mongoose.model("admin", AdminSchema)
module.exports = AdminModel;