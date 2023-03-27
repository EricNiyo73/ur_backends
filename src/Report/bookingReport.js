import booking from "../model/bookUserModel";
import XLSX from "xlsx";
export const boookingReport = (req, res) => {
  // Find all documents in the collection
  booking
    .find({})
    .then((docs) => {
      // Convert the documents to an array of objects
      const data = docs.map((doc) => ({
        fullname: doc.fullname,
        email: doc.email,
        assistantData: doc.assistantData,
        facilityname: doc.facilityname,
        category: doc.category,
        maxPeople: doc.maxPeople,
        purpose: doc.purpose,
        date: doc.date,
        time: doc.time,
        status: doc.status,
        rejectionReason: doc.rejectionReason,
        date: doc.submissionDate,
      }));

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Create a new worksheet with the data
      const ws = XLSX.utils.json_to_sheet(data);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Write the workbook to a buffer
      const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

      // Send the buffer as a response with the appropriate headers
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=bookingReport.xlsx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.end(buffer, "binary");
    })
    .catch((err) => {
      console.log("Failed to retrieve data from MongoDB", err);
      res.status(500).send("Failed to retrieve data from MongoDB");
    });
};
