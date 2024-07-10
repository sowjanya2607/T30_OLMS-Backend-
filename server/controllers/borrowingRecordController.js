const BorrowingRecord = require("../models/BorrowingRecord");

const getBorrowingRecords = async (req, res) => {
  try {
    const records = await BorrowingRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBorrowingRecord = async (req, res) => {
  const record = new BorrowingRecord({
    user: req.body.user,
    book: req.body.book,
    borrowDate: req.body.borrowDate,
    returnDate: req.body.returnDate,
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBorrowingRecord = async (req, res) => {
  try {
    const record = await BorrowingRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBorrowingRecord = async (req, res) => {
  try {
    await BorrowingRecord.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBorrowingRecords,
  createBorrowingRecord,
  updateBorrowingRecord,
  deleteBorrowingRecord,
};
