import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({

    newsTitle:{
        type: String,
        required: true,
        unique: true,
    },
    newsContent:{
        type: String,
        required: false,
    },
    newsImage:{
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
     },
});
export default mongoose.model('newsModel', newsSchema);