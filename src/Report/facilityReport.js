import facility from "../model/AdminModel";
import XLSX from "xlsx";
export const facilityReport = (req, res) => {
  // Find all documents in the collection
  facility
    .find({})
    .then((docs) => {
      // Convert the documents to an array of objects
      const data = docs.map((doc) => ({
        facilityname: doc.facilityname,
        category: doc.category,
        desc: doc.desc,
        image: doc.image,
        contactPersonName: doc.contactPersonName,
        maxcapacity: doc.maxcapacity,
        managerId: doc.managerId,
        date: doc.date,
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
        "attachment; filename=FacilityReport.xlsx"
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
