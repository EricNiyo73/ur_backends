// =======================admin for approving a request=================

// Endpoint for admins to approve or reject booking requests
export const bookrequest = async (req, res) => {
  if (req.body.status !== "Approved" || req.body.status !== "Rejected") {
    return res.status(400).json({
      status: "fail",
      message: "Invalid status",
    });
  }
  try {
    const bookingRequest = await BookingRequest.findById(req.params.id);
    let emailSubject;
    let emailBody;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    if (!bookingRequest) {
      return res.status(404).json({ message: "Booking request not found" });
    }
    let facilityBooked = await facility.findOne({
      facilityname: bookingRequest.facilityname,
    });

    // console.log(req.manager._id.toString(), facilityBooked.managerId);
    if (req.Manager._id.toString() === facilityBooked.managerId) {
      if (req.body.status === "Approved") {
        bookingRequest.status = req.body.status;
        await bookingRequest.save();
        // ============message========================
        // emailSubject = "Booking Confirmation";
        // emailBody = `<p>Dear ${bookingRequest.firstname},</p>
        //              <p>Your booking has been confirmed.</p>
        //              <p>Booking details:</p>
        //              <ul>
        //                <li>Facility: ${bookingRequest.fac}</li>
        //                <li>Date: ${bookingRequest.date}</li>
        //                <li>Time: ${bookingRequest.time}</li>
        //              </ul>`;
        // ============================================
        return res.json({ message: "Booking request approved successfully" });
      } else if (req.body.status === "Rejected") {
        // if (!req.body.rejectionReason) {
        //   return res
        //     .status(400)
        //     .json({ message: "Rejection reason is required" });
        // }
        bookingRequest.status = req.body.status;
        // bookingRequest.rejectionReason = req.body.rejectionReason;
        await bookingRequest.save();
        // ===================mesage====================
        // emailSubject = "Booking Rejection";
        // emailBody = `<p>Dear ${bookingRequest.email},</p>
        //          <p>Your booking has been rejected.</p>
        //          <p>${req.body.rejectionReason}</p>`;
        return res.json({ message: "Booking request rejected successfully" });
      } else {
        return res.status(400).json({ message: "Invalid status" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You are allowed to approve your facility booking" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingRequest.email,
      subject: emailSubject,
      html: emailBody,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking request" });
  }
};
