const express = require("express")
const bookModel = require('../models/books')
const bookRouter = express.Router();


bookRouter.post("/", async (req, res) => {

    const bookInstance = new bookModel({
        author: req.body.author,
        cover: req.body.cover,
        name: req.body.name,
        sumary: req.body.sumary,
        categoryId: req.body.categoryId,
        sumary: req.body.sumary,
    })
    const book = await bookInstance.save()
    try {
        res.json(book)
    }
    catch (err) {
    }

})
    .get("/", async (req, res) => {
        try {
            const book = await bookModel.find({}).populate("author").populate("categoryId").exec();
            res.json(book)
        }
        catch (err) {
        }
    })
    .get("/:id", async (req, res) => {
        let relatedBooks = [];
        const { id } = req.params
        const book = await bookModel.findById(id).populate("author").populate({ path: "reviews", populate: { path: "user" } }).exec();
        console.log("current book id", book.id)
        relatedBooks = (await bookModel.find({ categoryId: book.categoryId })).filter(bookf => bookf.id !== book.id)
        console.log(relatedBooks)
        try {
            res.status(200).send({ book, relatedBooks });
        }
        catch (err) {
        }
    })

    .delete("/:id", async (req, res) => {
        const result = await bookModel.findByIdAndRemove({ _id: req.params.id })
        try {
            res.json(result);

        }
        catch (err) {
        }
    }).patch("/:id", async (req, res) => {

        const { id } = req.params;
        const book = req.body
        const updatedBook = {
            ...(book.author ? { author: book.author } : {}),
            ...(book.cover ? { cover: book.cover } : {}),
            ...(book.name ? { name: book.name } : {}),
            ...(book.sumary ? { sumary: book.sumary } : {}),
            ...(book.categoryId ? { categoryId: book.categoryId } : {}),
            ...(book.sumary ? { sumary: book.sumary } : {}),
        }
        try {
            const bookA = await bookModel.findOneAndUpdate({ _id: id }, updatedBook)
            res.json(bookA)

        } catch (error) {
        }
    })

module.exports = bookRouter;