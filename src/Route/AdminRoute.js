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
  // deleteSub,
  // updateSub,
  deleteAll,
  rejecting,
  approving,
} from "../Controller/AdminController";
import { createFacilityMiddleware } from "../middlewire/approvalandcreateFacilityMiddleware";

// import accounts from '../middlewire/musthaveAccount';
import Authorization from "../middlewire/verifySpecialUser";
//CREATE
router.post(
  "/create",
  upload.single("image"),
  createFacilityMiddleware,
  createfacility
);

//UPDATE
router.put("/:id", upload.single("image"), Authorization, updatefacility);
//DELETE
// router.delete("/:id", deletefacility);
router.delete("/deleteMany/", deleteAll);
//GET ALL
router.get("/:id", getfacilit);

router.get("/", getfacility);

// router.delete("/facility/:facilityId/:id", Authorization, deleteSub);
// router.put(
//   "/facility/:facilityId/:id",
//   upload.single("image"),
//   Authorization,
//   updateSub
// );

// change role
router.patch("/Role/:id", userRole);
// appove
router.patch("/booking/approving/:id", createFacilityMiddleware, approving);

router.patch("/booking/rejecting/:id", createFacilityMiddleware, rejecting);

export default router;
