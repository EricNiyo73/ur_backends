import mongoose from 'mongoose';

const bookAdminSchema = new mongoose.Schema({
    facility: [
      [{
        type: Array,
        default: [],
        facilityname: {
          type: String,
          required: true,
        },
        subFacility: [
          {
            facility_number: {
              type: String,
              required: true,
            },
            capacity: {
              type: Number,
              required: true,
            },
          },
        ],
      }]
    ],
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
})
export default mongoose.model("bookAdmin", bookAdminSchema);