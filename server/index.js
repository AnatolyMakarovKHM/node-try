import express from "express";
import mongoose from "mongoose";

import userController from "./serverServices/DAL/user";
import bookController from "./serverServices/DAL/book";

const router = new express.Router();

mongoose.connect("mongodb://localhost/nodetry1");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});

//user
router.get("/users", userController.getUsersPage);
router.get("/api/users", userController.getUsers);
router.get("/api/users/:account_name", userController.getUsersById);
router.post("/api/users/add", userController.addUser);
router.put("/api/users/:account_name", userController.updateUser);
router.delete("/api/users/:account_name", userController.deleteUser);

//book
router.get("/users/:account_name/books", bookController.getUserBooksPage);
router.get("/api/allbooks", bookController.getAllBooks);
router.get("/api/users/:account_name/books", bookController.getUserBooks);
router.get("/api/books/:name", bookController.getBookByName);
router.post("/api/books/add", bookController.addBook);

module.exports = router;
