const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    time: { type: String, required: true },
    priceNpr: { type: Number, required: true },
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    img: { type: String, required: true },
    bookedSeats: { type: [Number], default: [] } // atomic bookings
  },
  { timestamps: true }
);

module.exports = model("Room", roomSchema);
