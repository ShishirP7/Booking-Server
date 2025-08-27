const { Schema, model } = require("mongoose");

const lectureSchema = new Schema(
  {
    name: { type: String, required: true },
    time: { type: String, required: true },
    priceNpr: { type: Number, required: true },
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    img: { type: String, required: true },
    bookedSeats: { type: [Number], default: [] }
  },
  { timestamps: true }
);

module.exports = model("Lecture", lectureSchema);
