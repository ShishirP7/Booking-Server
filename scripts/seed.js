const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Room = require("../src/models/Room");
const Lecture = require("../src/models/Lecture");

const READING_ROOMS = [
  { name: "Reading Room A", time: "6:00 AM – 10:00 PM", priceNpr: 120, rows: 5, cols: 8, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop" },
  { name: "Reading Room B", time: "6:00 AM – 10:00 PM", priceNpr: 120, rows: 5, cols: 8, img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" },
  { name: "Quiet Zone", time: "7:00 AM – 9:00 PM", priceNpr: 150, rows: 6, cols: 7, img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop" },
  { name: "Window Bay", time: "7:00 AM – 9:00 PM", priceNpr: 140, rows: 6, cols: 7, img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop" },
  { name: "Reference Nook", time: "8:00 AM – 8:00 PM", priceNpr: 110, rows: 5, cols: 6, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop" },
  { name: "Group Study", time: "8:00 AM – 8:00 PM", priceNpr: 130, rows: 5, cols: 6, img: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop" },
  { name: "Evening Hall", time: "2:00 PM – 10:00 PM", priceNpr: 100, rows: 5, cols: 6, img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop" }
];

const NMCLE_CLASSES = [
  { name: "Physiology – Morning Batch", time: "7:00 – 9:00 AM", priceNpr: 300, rows: 6, cols: 10, img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop" },
  { name: "Pharmacology – Afternoon",    time: "1:00 – 3:00 PM", priceNpr: 320, rows: 6, cols: 10, img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" },
  { name: "Anatomy – Evening",           time: "5:00 – 7:00 PM", priceNpr: 350, rows: 6, cols: 10, img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop" }
];

(async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/studyhub";
  await mongoose.connect(uri);
  console.log("Connected to Mongo");

  await Room.deleteMany({});
  await Lecture.deleteMany({});

  const rooms = await Room.insertMany(READING_ROOMS);
  const classes = await Lecture.insertMany(NMCLE_CLASSES);

  console.log(`Seeded ${rooms.length} rooms and ${classes.length} classes`);
  await mongoose.disconnect();
  console.log("Done.");
})();
