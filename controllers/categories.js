const categoriesModel = require('../models/categories');


//find all categories
async function listCategories() {
    return await categoriesModel.find({});
}
module.exports = {
    listCategories,
}