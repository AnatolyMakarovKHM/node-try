import Book from "../schemas/book";

const controller = {};

controller.getAllBooks = function (req, res) {
    return Book.find(function(err, books) {
        if (!err) {
            res.send(books);
        } else {
            res.render(err);
        }
    });
};

controller.getUserBooksPage = function (req, res) {
    return Book.find({author:req.params.account_name},function(err, books) {
        if (!err) {
            res.render("books-list", {books: books, title: "Books written by " + req.params.account_name});
        } else {
            res.render(err);
        }
    });
};

controller.getUserBooks = function (req, res){
    return Book.find({author:req.params.account_name},function(err, books) {
        if (!err) {
            res.send(books);
        } else {
            res.send(err);
        }
    });
};

controller.getBookByName = function(req, res){
    return Book.find({name:req.params.name},function(err,books){
        if (!err) {
            res.send(books);
        } else {
            res.send(err);
        }
    });
};

controller.addBook = function(req, res) {
    //@todo can be check if author exist
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author
    });
    newBook.save(function (err) {
        if (!err) {
            res.send(req.body.name + " - created");
        } else {
            res.send(err);
        }
    });
};

export default controller;