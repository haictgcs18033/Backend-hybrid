const express = require("express");
const shortid = require("shortid");
const {
  getRental,
  addRental,
  updateRental,
  deleteRental,
  addNote,
  getRentalDetail,
  searchRental,
  getAllRental,
} = require("../Controller/rentalController");
const { requireSignin } = require("../middleware/middleware");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + shortid.generate() + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });
router.get("/getAllRental", getAllRental);
router.get("/getRental", requireSignin, getRental);
router.post("/addRental", requireSignin, upload.single("image"), addRental);
router.get("/getRentalDetail/:id", requireSignin, getRentalDetail);
router.post("/updateRental", requireSignin, updateRental);
router.post("/deleteRental", requireSignin, deleteRental);
router.post("/addNote", requireSignin, addNote);
router.get("/searchRental", searchRental);

module.exports = router;
