const Room = require("../models/Room");
const Lecture = require("../models/Lecture");
const Booking = require("../models/Booking");
const { z } = require("zod");

const bookingSchema = z.object({
  kind: z.enum(["room", "class"]),
  itemId: z.string().min(1),
  seats: z.array(z.number().int().nonnegative()).min(1),
  customer: z.object({
    name: z.string().min(1),
    phone: z.string().min(3),
    email: z.string().email().optional().or(z.literal(""))
  }),
  priceNprPerSeat: z.number().positive(),
  notes: z.string().optional()
});

function modelFor(kind) {
  return kind === "room" ? Room : Lecture;
}

// POST /api/bookings
exports.createBooking = async (req, res, next) => {
  try {
    const payload = bookingSchema.parse(req.body);

    const Model = modelFor(payload.kind);
    const item = await Model.findById(payload.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const totalSeats = item.rows * item.cols;
    const invalid = payload.seats.some((n) => n < 0 || n >= totalSeats);
    if (invalid) return res.status(400).json({ error: "Invalid seat index" });

    // Atomic seat reservation: only add if none of the requested seats are already taken
    const seatUpdate = await Model.updateOne(
      { _id: payload.itemId, bookedSeats: { $nin: payload.seats } },
      { $addToSet: { bookedSeats: { $each: payload.seats } } }
    );

    if (seatUpdate.modifiedCount === 0) {
      return res.status(409).json({ error: "Some seats are already booked, pick different seats." });
    }

    const totalPrice = payload.seats.length * payload.priceNprPerSeat;
    const booking = await Booking.create({
      kind: payload.kind,
      itemId: payload.itemId,
      seats: payload.seats,
      priceNprPerSeat: payload.priceNprPerSeat,
      totalPrice,
      customer: payload.customer,
      status: "confirmed",
      notes: payload.notes
    });

    res.status(201).json(booking);
  } catch (e) { next(e); }
};

// GET /api/bookings?itemId=...&kind=room|class
exports.listBookings = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.itemId) filter.itemId = req.query.itemId;
    if (req.query.kind) filter.kind = req.query.kind;
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (e) { next(e); }
};

// DELETE /api/bookings/:id  (also frees seats)
exports.cancelBooking = async (req, res, next) => {
  try {
    const bk = await Booking.findById(req.params.id);
    if (!bk) return res.status(404).json({ error: "Not found" });
    if (bk.status === "cancelled") return res.json(bk);

    const Model = modelFor(bk.kind);
    await Model.updateOne(
      { _id: bk.itemId },
      { $pull: { bookedSeats: { $in: bk.seats } } }
    );

    bk.status = "cancelled";
    await bk.save();
    res.json(bk);
  } catch (e) { next(e); }
};
