const express = require("express")
const categoriesModel = require('../models/categories')
const categoriesRouter = express.Router();
const categoriesController = require('../controllers/categories')
const booksModel = require('../models/books');

categoriesRouter.post("/", async (req, res) => {

    const categoriesInstance = new categoriesModel({
        name: req.body.name,
    })

    const category = await categoriesInstance.save()
    try {
        res.json(category)
    }
    catch (err) {
    }

})


    // <<<<<<< bassiouny
    //     .get("/", async (req, res) => {
    //         try {
    //             res.send(categoriesController.listCategories())
    //         }
    //         catch {
    //             res.send("error")
    //         }
    //         // const category = await categoriesModel.find({})
    //         // try {
    //         //     console.log(category);
    //         //     res.json(category)
    //         // }
    //         // catch (err) {
    //         //     console.log(err)
    //         // }
    //     })
    // =======
    .get("/", async (req, res) => {
        const category = await categoriesModel.find({}).populate("books").exec()
        try {
            res.json(category)
        }
        catch (err) {
        }
    })


    .get("/:id", async (request, response) => {
        const { id } = request.params
        try {
            const category = await categoriesModel.findById(id).populate("books").exec()
            response.json(category);
        } catch (error) {
        }
    })

    .delete("/:id", async (request, response) => {
        try {
            const { id } = request.params
            const category = await categoriesModel.findById(id);
            if (category.books.length < 1) {
                const deletedcategory = await categoriesModel.deleteOne({ _id: id });
                response.status(200).send({ deleted: true, message: "Category deleted succeffully" });
            } else {
                response.status(202).send({
                    deleted: false, message: "This Category Contains books"
                });
            }
        } catch (error) {
            response.status(400).send(error.message);
        }
    })
    .patch("/:id", async (request, response) => {
        const { id } = request.params;
        const category = request.body
        const updatedcategory = {
            ...(category.name ? { name: category.name } : {}),
            ...(category.categoryId ? { categoryId: category.categoryId } : {})
        }
        try {
            const updatededcategory = await categoriesModel.findOneAndUpdate({ _id: id }, updatedcategory)
            response.status(200).send({ message: "category edited succeffully" })
        } catch (error) {
        }
    })

module.exports = categoriesRouter;