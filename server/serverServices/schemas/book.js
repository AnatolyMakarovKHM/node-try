import mongoose from "mongoose";

export const name = "book";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    author: {
        type: String,
        require: true
    }
});

const model = mongoose.model(name,schema);

export default model;