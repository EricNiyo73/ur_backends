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

import accounts from '../middlewire/musthaveAccount';
import Authorization from '../middlewire/verifyAdmin';
//CREATE
router.post("/create",upload.single("image"),createfacility);

//UPDATE
router.put("/:id",Authorization, updatefacility);
//DELETE
router.delete("/:id", Authorization,deletefacility);
//GET ALL
router.get("/:id", accounts,getfacilit);
router.get("/", accounts,getfacility);

// change role
router.patch('/Role/:id',userRole);
// appove
router.patch('/booking-requests/:id',bookrequest)

export default router;