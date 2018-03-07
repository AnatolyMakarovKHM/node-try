import mongoose from "mongoose";

export const name = "user";

const schema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    account_name: {
        type: String,
        unique: true,
        require: true
    }
});

const model = mongoose.model(name,schema);

export default model;
