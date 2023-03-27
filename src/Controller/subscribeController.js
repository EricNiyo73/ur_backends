import express from "express";
import Router from "express";
const router = Router();
import bodyParser from "body-parser";
import subscribers from "../model/subscribers";

export const createSubscribe = async (req, res, next) => {
  try {
    const checksub = await subscribers.findOne({ email: req.body.email });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (checksub) {
      return res.status(400).json({
        message: "Email already subscribed to this Site",
      });
    } else {
      const newsubscribe = new subscribers({
        email: req.body.email,
      });
      const subscri = await newsubscribe.save();
      return res.status(200).json({
        subscri,
        status: "Subscribe added successfully",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error);
  }
};

// =========================get All subscribers =================
export const findAll = async (req, res) => {
  try {
    const suscribe = await subscribers.find();

    return res.status(200).json({
      data: suscribe,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// =================================unsbscribe================================

export const unsubscribe = async (req, res) => {
  try {
    const subs = await subscribers.findById(req.params.id);
    try {
      await subs.delete();
      return res.status(200).json("you have successfully unsubscribed");
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
