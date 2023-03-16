import express from "express";
const router = express.Router();
import { userRole } from "../admin/changeRole";
import {
  createfacility,
  deletefacility,
  getfacility,
  getfacilit,
  updatefacility,
  upload,
  bookrequest,
  deleteSub,
  updateSub,
} from "../Controller/AdminController";

// import accounts from '../middlewire/musthaveAccount';
// import Authorization from '../middlewire/verifyAdmin';
//CREATE
router.post("/create", upload.single("image"), createfacility);

//UPDATE
router.put("/:id", upload.single("image"), updatefacility);
//DELETE
router.delete("/:id", deletefacility);
//GET ALL
router.get("/:id", getfacilit);

router.get("/", getfacility);

router.delete("/facility/:facilityId/:id", deleteSub);
router.put("/facility/:facilityId/:id", upload.single("image"), updateSub);

// change role
router.patch("/Role/:id", userRole);
// appove
router.patch("/booking-requests/:id", bookrequest);

export default router;
