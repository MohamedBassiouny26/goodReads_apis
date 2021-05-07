const UserModel = require('../models/users')
const BookModel = require('../models/books')

//Save new User
async function saveNewUser(req, res) {
    const userInstance = new UserModel({
        photo: req.body.photo,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        review: req.body.review,
        library: req.body.library
    })
    const user = await userInstance.save()
    try {
        res.json(user)
    }
    catch (err) {
        res.json(err.message)
    }
}

//list all books for user
async function getBooks(req, res) {
    try {
        const userData = await UserModel.findById(req.params.id).populate({ path: 'library', populate: { path: 'bookId' } }).exec();
        res.status(200).send(userData.library)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// list books with read status
async function getReadBooks(req, res) {
    try {
        const readBooks = await getBooksByStatus(req.params.id, "Read")
        res.status(200).send(readBooks)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getCurrentlyReadingBooks(req, res) {
    try {
        const readBooks = await getBooksByStatus(req.params.id, "Currently Reading")
        res.status(200).send(readBooks)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getWantToReadBooks(req, res) {
    try {
        const readBooks = await getBooksByStatus(req.params.id, "Want To Read")
        res.status(200).send(readBooks)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getBooksByStatus(userId, status) {
    const allBooks = await UserModel.findOne({ _id: userId }).select({ library: 1, _id: 0 }).populate({ path: 'library', populate: { path: 'bookId' } }).exec()
    const readBooks = allBooks.library.filter((book) => book.status === status)
    // con
    return readBooks
}
async function addBookForUser(req, res) {
    try {
        await UserModel.findByIdAndUpdate(req.params.id, { $push: { library: { ...req.body, rating: 0 } } })
        res.json({ status: 200, message: "Book Added Succeffully" });
    } catch (erro) {
        res.status(400).send("bad request")
    }
}

async function getUser(req, res) {
    try {
        res.status(200).send(await UserModel.findById(req.params.id).populate({ path: 'library', populate: { path: 'bookId' } }).exec());

    } catch (error) {
        res.status(400).send("UserID not Found");
    }
}
async function getUsers(req, res) {
    const user = await UserModel.find({}).populate({ path: 'library', populate: { path: 'bookId' } }).exec()
    try {
        res.json(user)
    }
    catch (err) {
        res.json(err.message)
    }
}
async function addBookReview(req, res) {
    try {
        await UserModel.findByIdAndUpdate(req.params.id,
            { '$set': { 'library.$[el].review': req.body.review } },
            {
                arrayFilters: [{ "el.bookId": req.body.bookId }],
                new: true
            })
        await BookModel.findByIdAndUpdate(req.body.bookId, { $push: { reviews: { body: req.body.review, user: req.params.id } } });

        res.json({ status: 200, message: "success" });
    } catch (error) {

        res.status(500).send("bad request")
    }
}
async function addBookRating(req, res) {
    try {
        await UserModel.findByIdAndUpdate(req.params.id,
            { '$set': { 'library.$[el].rating': req.body.rating } },
            {
                arrayFilters: [{ "el.bookId": req.body.bookId }],
                new: true
            })
        await BookModel.findByIdAndUpdate(req.body.bookId, { $inc: { sumAvg: req.body.rating, countAvg: 1 } });
        res.status(200).send("Rating Added Succeffully");
    } catch (error) {
        res.status(500).send("bad request")
    }
}
async function editBookRating(req, res) {
    const user = await UserModel.findById(req.params.id, { library: { $elemMatch: { bookId: req.body.bookId } } }).select('-_id');
    const oldRating = user.library[0].rating ? user.library[0].rating : 0;
    const newCount = oldRating ? 0 : 1;
    try {
        await UserModel.findByIdAndUpdate(req.params.id,
            { '$set': { 'library.$[el].rating': req.body.rating } },
            {
                arrayFilters: [{ "el.bookId": req.body.bookId }],
                new: true
            })
        const editRating = req.body.rating - oldRating;
        await BookModel.findByIdAndUpdate(req.body.bookId, {
            '$inc': { sumAvg: editRating, countAvg: newCount }
        });
        res.json({ message: "Rating Added Succeffully" });
    } catch (error) {
        res.status(500).send("bad request")
    }
}
async function editBookStatus(req, res) {
    try {
        await UserModel.findByIdAndUpdate(req.params.id,
            { '$set': { 'library.$[el].status': req.body.status } },
            {
                arrayFilters: [{ "el.bookId": req.body.bookId }],
                new: true
            })

        res.json({ message: "Status Added Succeffully" });
    } catch (error) {
        res.status(500).send("bad request")
    }
}
async function deleteBook(req, res) {
    try {
        // UserModel.findById(req.params.id);
        await UserModel.findByIdAndUpdate(req.params.id,
            { '$pull': { library: { bookId: req.body.bookId } } },
            { multi: true }
        )
        res.status(200).send("book deleted succeffuly");
    } catch (error) {
        res.status(400).send(error.message)
    }
}
async function updateUser(req, res) {
    const { id } = req.params;
    const user = req.body
    try {
        const updatedUser = {
            ...(user.fname ? { fname: user.fname } : {}),
            ...(user.lname ? { lname: user.lname } : {}),
            ...(user.email ? { email: user.email } : {}),
            ...(user.photo ? { photo: user.photo } : {})
        }
        const result = await UserModel.findOneAndUpdate({ _id: id }, updatedUser)
        res.json(result)
    } catch (error) {
        res.json(error.message)
    }
}








module.exports = {
    getBooks,
    getReadBooks,
    saveNewUser,
    getCurrentlyReadingBooks,
    getWantToReadBooks,
    getUser,
    addBookForUser,
    getUsers,
    addBookReview,
    addBookRating,
    editBookRating,
    updateUser,
    editBookStatus,
    deleteBook
}