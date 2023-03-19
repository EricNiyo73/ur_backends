import book from "../model/bookUserModel.js";
import User from "../model/userModel.js";
import nodemailer from "nodemailer";

// ==============check Availability====================

export const checkAvailability = async (req, res) => {
  try{
  const existingBooking = await book.findOne({
    subFacility: req.body.subFacility,
    date: req.body.date,
  });
  if (existingBooking) {
    if (
      ((existingBooking.time === "Morning") &&   (req.body.time === "Morning" || req.body.time === "Fullday")) &&
      (existingBooking.status === "Approved"))
     {
      return res
        .status(403)
        .json("No available booking for the specified date and time1");
     } 
     else if (
      (existingBooking.time === "Afternoon") &&
       ( req.body.time === "Afternoon" || req.body.time === "Fullday") 
       && (existingBooking.status ==="Approved")
    ) {
      return res
        .status(403)
        .json("No available booking for the specified date and time2");
    } 
    else if (
      (existingBooking.time === "Fullday" ) &&
       ( req.body.time === "Afternoon" ||
      req.body.time === "Morning" ||
      req.body.time === "Fullday")
      && (existingBooking.status ==="Approved")
    ) {
      return res
        .status(403)
        .json("No available booking for the specified date and time tird");
    }
    else {
      return res
        .status(201)
        .json("you can book this book");
    }
    } else {
      return res
       .status(200)
       .json("you can book now");
    
}
} catch (err) {
  console.error(err);
  return res.status(500).json(err);
}
}
// ==================creation of availability book===========

export const createbooking = async (req, res) => {
  console.log(req.body.time);
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingBooking = await book.findOne({
      subFacility: req.body.subFacility,
      date: req.body.date,
    });
    if (existingBooking) {
      if (
        ((existingBooking.time === "Morning") &&   (req.body.time === "Morning" || req.body.time === "Fullday")) &&
        (existingBooking.status === "Approved"))
       {
        return res
          .status(403)
          .json("No available booking for the specified date and time1");
       } 
       else if (
        (existingBooking.time === "Afternoon") &&
         ( req.body.time === "Afternoon" || req.body.time === "Fullday") 
         && (existingBooking.status ==="Approved")
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time2");
      } 
      else if (
        (existingBooking.time === "Fullday" ) &&
         ( req.body.time === "Afternoon" ||
        req.body.time === "Morning" ||
        req.body.time === "Fullday")
        && (existingBooking.status ==="Approved")
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time tird");
      }
      else {
        const bookingdata = {
          ...req.body,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        };
        // create a new booking
        const booking = new book(bookingdata);
        // booking.roomUser = availableBooking._id;
  
        await booking.save();
  
        return res.status(200).json({
          message: "Booking request submitted successfully",
          booking,
        });
      }
     } else {
      const bookingData = {
        ...req.body,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      // create a new booking
      const booking = new book(bookingData);
      // booking.roomUser = availableBooking._id;

      await booking.save();

      return res.status(200).json({
        message: "Booking request submitted successfully",
        booking,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};


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
