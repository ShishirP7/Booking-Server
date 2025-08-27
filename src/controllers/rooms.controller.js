const Room = require("../models/Room");
const { z } = require("zod");

exports.listRooms = async (_req, res, next) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (e) { next(e); }
};

exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Not found" });
    res.json(room);
  } catch (e) { next(e); }
};

exports.getAvailability = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).select("rows cols bookedSeats");
    if (!room) return res.status(404).json({ error: "Not found" });
    const total = room.rows * room.cols;
    res.json({ rows: room.rows, cols: room.cols, total, bookedSeats: room.bookedSeats });
  } catch (e) { next(e); }
};
