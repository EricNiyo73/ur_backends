import book from "../model/bookUserModel.js";
import User from '../model/userModel.js';
import nodemailer from 'nodemailer';
// ==================creation of availability book===========

export const createbooking = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user){
      return res.status(404).json({message: "User not found"});
    }
    const date = req.body.date; 
    const time = req.body.time;
    // const existingBooking = await book.findOne({
    //   availability: {
    //     $elemMatch: {
    //       date: { $eq: date },
    //       time: { $eq: time }
    //     }
    //   }
    //   // 'availability.isAvailable': true,
    //   // maxPeople: { $gte: capacity },
    // });
    const existingBooking  = await book.findOne({ 
      subFacility: req.body.subFacility,
      date: req.body.date,
      time: req.body.time,
    });

    if (existingBooking) {
      return res.status(401).json("No available booking for the specified date and time");
    } 
    else{
    const bookingData = {
      ...req.body,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      
    };
    // create a new booking
    const booking = new book(bookingData);
    // booking.roomUser = availableBooking._id;

    await booking.save();

    return res.status(200).json({
      message: "Booking request submitted successfully",
      booking,
    });
  }} catch (err) {
    console.error(err);
    return res.status(500).json("failed");
  }
};

// export const createbooking = async (req, res,date, time,capacity) => {
//   try{
//   book.findOne({ 
//     'availability.date': date, 
//     'availability.time': time, 
//     'availability.isAvailable': true},
//      (err, bookuser) => {
//     if (err) {
//       return res.status(500).json("there is an error");
//     } else if (!bookuser) {
//       return res.status(401).json("No available booking for the specified date and time");
//     } else {
//       // create a new booking
//       const booking = new book(req.body);

//       booking.save((err,booking)=>{
//         if(err){
//           return res.status(500).json("failed");
//         }
//         else {
//           return res.status(200).json({
//             message: "success",
//             booking
//           });
//         }
//       });
//     }
//   });
//   } catch (err) {
//     next(err);
//   }
  // const newbook = new book(req.body);

  // try {
  //   const savedbook = await newbook.save();
  //   res.status(200).json(savedbook);
  // } catch (err) {
  //   next(err);
  // }
// };

// ==================update book==========================

export const updatebook = async (req, res, next) => {
    try {
      const updatedbook = await book.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedbook);
    } catch (err) {
      next(err);
    }
  };


//   ==============================delete ==========================

export const deletebook = async (req, res) => {

  try {
    const booking = await book.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found",
      });
    }
    return res.status(204).json({
      status: "success",
      data: "booking deleted successfuly",
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", error });
  }
  };

//   ==============================get one book================================
export const getbook = async (req, res, next) => {
    try {
      const getbook = await book.findById(req.params.id);
      res.status(200).json(getbook);
    } catch (err) {
      next(err);
    }
  };
//   ==========================get books availability==========================
export const getbooks = async (req, res, next) => {
    try {
      const books = await book.find();
      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  };