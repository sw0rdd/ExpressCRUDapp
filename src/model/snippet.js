import mongoose from "mongoose";


const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},  { timestamps: true });


module.exports = mongoose.model('Snippet', snippetSchema);

