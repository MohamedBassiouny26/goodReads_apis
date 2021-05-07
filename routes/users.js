const express = require("express")
const userModel = require('../models/users')
const userRouter = express.Router();
const UserController = require('../controllers/users')

userRouter.get("/:id/books", UserController.getBooks);
userRouter.get("/:id", UserController.getUser)
userRouter.patch("/:id", UserController.updateUser)
userRouter.post("/", UserController.saveNewUser);
userRouter.get("/:id/read", UserController.getReadBooks);
userRouter.get("/:id/want-to-read", UserController.getWantToReadBooks);
userRouter.get("/:id/currently-reading", UserController.getCurrentlyReadingBooks);
userRouter.post("/:id/add-book", UserController.addBookForUser);
userRouter.post("/:id/add-review", UserController.addBookReview);
userRouter.post("/:id/add-rating", UserController.addBookRating);
userRouter.patch("/:id/edit-rating", UserController.editBookRating);
userRouter.patch("/:id/edit-status", UserController.editBookStatus);
userRouter.patch("/:id/delete-book", UserController.deleteBook)

userRouter.get("/", UserController.getUsers);


module.exports = userRouter;