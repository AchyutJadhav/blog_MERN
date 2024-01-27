const express = require("express");
const router = require("express").Router();
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer"); //
const path = require("path"); //
const  cors = require("cors");


app.use(express.json());
dotenv.config();
app.use("/images", express.static(path.join(__dirname, "/images")));


mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://0.0.0.0:27017/MERNblog")
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

app.listen("5000", () => {
  console.log("Backend is running");
});
