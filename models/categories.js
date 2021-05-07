const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true  , unique:true},
    
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }]
})

const categoriesModel = mongoose.model("categories", categoriesSchema)
module.exports = categoriesModel;