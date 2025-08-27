const Lecture = require("../models/Lecture");

exports.listClasses = async (_req, res, next) => {
  try {
    const classes = await Lecture.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (e) { next(e); }
};

exports.getClass = async (req, res, next) => {
  try {
    const cls = await Lecture.findById(req.params.id);
    if (!cls) return res.status(404).json({ error: "Not found" });
    res.json(cls);
  } catch (e) { next(e); }
};

exports.getAvailability = async (req, res, next) => {
  try {
    const cls = await Lecture.findById(req.params.id).select("rows cols bookedSeats");
    if (!cls) return res.status(404).json({ error: "Not found" });
    const total = cls.rows * cls.cols;
    res.json({ rows: cls.rows, cols: cls.cols, total, bookedSeats: cls.bookedSeats });
  } catch (e) { next(e); }
};
