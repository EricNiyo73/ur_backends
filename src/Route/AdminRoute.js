import express from "express";
const router = express.Router();
import {userRole} from  '../admin/changeRole';
import {
  createfacility,
  deletefacility,
  getfacility,
  getfacilit ,
  updatefacility,
  upload,
  bookrequest
} from "../Controller/AdminController";


//CREATE
router.post("/create",upload.single("image"), createfacility);

//UPDATE
router.put("/:id", updatefacility);
//DELETE
router.delete("/:id", deletefacility);
//GET ALL
router.get("/:id", getfacilit);
router.get("/", getfacility);

// change role
router.patch('/Role/:id',userRole);
// appove
router.patch('/booking-requests/:id',bookrequest)

export default router;