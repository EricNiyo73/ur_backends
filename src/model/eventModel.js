import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    eventTitle:{
        type: String,
        rquired: true
    },
    eventContent:{
        type: String,
    },
    eventImage:{
        type: String,
   
    },
    date: {
        type: Date,
        default: Date.now,
     },
});

export default mongoose.model('eventModel', eventSchema);