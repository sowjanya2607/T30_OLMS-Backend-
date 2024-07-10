const express = require("express");
const {
  getBorrowingRecords,
  createBorrowingRecord,
  updateBorrowingRecord,
  deleteBorrowingRecord,
} = require("../controllers/borrowingRecordController");
const router = express.Router();

router.get("/", getBorrowingRecords);
router.post("/", createBorrowingRecord);
router.put("/:id", updateBorrowingRecord);
router.delete("/:id", deleteBorrowingRecord);

module.exports = router;
