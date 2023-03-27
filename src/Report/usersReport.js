import userModel from "../model/userModel";
import XLSX from "xlsx";
export const userReport = (req, res) => {
  // Find all documents in the collection
  userModel
    .find({})
    .then((docs) => {
      // Convert the documents to an array of objects
      const data = docs.map((doc) => ({
        userImage: doc.userImage,
        fullname: doc.fullname,
        email: doc.email,
        password: doc.password,
        role: doc.role,
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
        "attachment; filename=UsersReport.xlsx"
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
