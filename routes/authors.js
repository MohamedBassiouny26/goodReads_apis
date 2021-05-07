const express = require("express")
const authorModel = require('../models/author')
const authorRouter = express.Router();


authorRouter.post("/", async (req, res) => {

    const authorInstance = new authorModel({
        ID: req.body.ID,
        photo: req.body.photo,
        fname: req.body.fname,
        lname: req.body.lname,
        dateOfBirth: req.body.dateOfBirth
    })

    const author = await authorInstance.save()
    try {
        res.json(author)
    }
    catch (err) {
    }
})
    .get("/", async (req, res) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        //aya
        const author = await authorModel.find({}).populate("books").exec();
        try {
            res.json(author)
        }
        catch (err) {
        }
    }).get("/:id", async (req, res) => {
        const { id } = req.params
        try {
            const author = await authorModel.findById(id).populate("books").exec();
            res.json(author)
        }
        catch (err) {
        }

    }).delete("/:id", async (req, res) => {
        try {
            const author = await authorModel.findById(req.params.id);
            if (author.books.length < 1) {
                const result = await authorModel.findByIdAndRemove({ _id: req.params.id })
                res.status(200).send("author deleted succefully");
            } else {
                res.send("can't delelte author contains books")
            }
        }
        catch (err) {
        }

    }).patch("/:id", async (req, res) => {

        const { id } = req.params;
        const author = req.body
        const updatedUAuthor = {
            ...(author.ID ? { ID: author.ID } : {}),
            ...(author.photo ? { photo: author.photo } : {}),
            ...(author.fname ? { fname: author.fname } : {}),
            ...(author.lname ? { lname: author.lname } : {}),
            ...(author.dateOfBirth ? { dateOfBirth: author.dateOfBirth } : {}),
        }

        try {
            const authorA = await authorModel.findOneAndUpdate({ _id: id }, updatedUAuthor)
            res.json(authorA)

        } catch (error) {
        }
    })


module.exports = authorRouter;