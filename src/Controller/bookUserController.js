import book from "../model/bookUserModel.js";
import User from "../model/userModel.js";
import nodemailer from "nodemailer";
import BookingRequest from "../model/bookUserModel";
import facility from "../model/AdminModel.js";

// ==============check Availability====================

export const checkAvailability = async (req, res) => {
  try {
    const existingBooking = await book.findOne({
      subFacility: req.body.subFacility,
      date: req.body.date,
    });
    if (existingBooking) {
      if (
        existingBooking.time === "Morning" &&
        (req.body.time === "Morning" || req.body.time === "Fullday") &&
        existingBooking.status === "Approved"
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time1");
      } else if (
        existingBooking.time === "Afternoon" &&
        (req.body.time === "Afternoon" || req.body.time === "Fullday") &&
        existingBooking.status === "Approved"
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time2");
      } else if (
        existingBooking.time === "Fullday" &&
        (req.body.time === "Afternoon" ||
          req.body.time === "Morning" ||
          req.body.time === "Fullday") &&
        existingBooking.status === "Approved"
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time tird");
      } else {
        return res.status(201).json("you can book this book");
      }
    } else {
      return res.status(200).json("you can book now");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
// ==================creation of availability book===========

export const createbooking = async (req, res) => {
  try {
    const existingBooking = await book.findOne({
      facilityname: req.body.facilityname,
      date: req.body.date,
    });
    if (existingBooking) {
      if (
        existingBooking.time === "Morning" &&
        (req.body.time === "Morning" || req.body.time === "Fullday") &&
        existingBooking.status === "Approved"
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time1");
      } else if (
        existingBooking.time === "Afternoon" &&
        (req.body.time === "Afternoon" || req.body.time === "Fullday") &&
        existingBooking.status === "Approved"
      ) {
        return res
          .status(403)
          .json("No available booking for the specified date and time2");
      } else if (
        existingBooking.time === "Fullday" &&
        (req.body.time === "Afternoon" ||
          req.body.time === "Morning" ||
          req.body.time === "Fullday") &&
        existingBooking.status === "Approved"
      ) {
        return res
          .status(404)
          .json("No available booking for the specified date and time tird");
      } else {
        const bookingdata = {
          ...req.body,
          fullname: req.Administrative_Assistant.fullname,
          email: req.Administrative_Assistant.email,
          assistantId: req.Administrative_Assistant._id,
          assistantData: req.assistantData,
        };
        // create a new booking
        const booking = new book(bookingdata);

        await booking.save();

        return res.status(200).json({
          message: "Booking request submitted successfully",
          booking,
        });
      }
    } else {
      const bookingdata = {
        ...req.body,
        fullname: req.Administrative_Assistant.fullname,
        email: req.Administrative_Assistant.email,
        assistantId: req.Administrative_Assistant._id,
        assistantData: req.assistantData,
      };
      // create a new booking
      const booking = new book(bookingdata);

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

export const deleteAll = async (req, res) => {
  try {
    await book.deleteMany({});

    return res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// =============================canceling a request=====================

export const cancelbooking = async (req, res) => {
  try {
    const bookingRequest = await BookingRequest.findById(req.params.id);
    if (
      req.Administrative_Assistant._id.toString() === bookingRequest.assistantId
    ) {
      await book.findByIdAndUpdate(
        req.params.id,
        { $set: { status: "Cancelled" } },
        { new: true }
      );
    } else {
      return res.status(403).json({
        status: "failed",
        message: "you can't cancel this booking",
      });
    }
    if (!bookingRequest) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found",
      });
    }
    return res.status(204).json({
      status: "success",
      data: "booking cancelled successfuly",
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", error });
  }
};
