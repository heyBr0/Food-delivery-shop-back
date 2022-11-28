import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import recordsRoutes from "./routes/recordsRoutes.js";
import otherRoutes from "./routes/ordersRoutes.js";
import dotenv from "dotenv";
import verifyToken from "./validations/verifyToken.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors"
dotenv.config();

const app = express();
const PORT = 4000;


// configure Multer package, setting storage destination
//const upload = multer({dest:"upload/", })

// setup multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fullPath = "./upload";
    cb(null, fullPath);
  },
  filename(req, file, cb) {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

// create mongoose connection
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB connection established");
}); // local

// middleware Request checker
app.use(morgan("dev"));
// express json middleware to parse any incoming json data
app.use(express.json());
// MVC:
// Models = database, data storage
// Views = UI, frontend, presentational data
// Controllers = request handlers, logic

// cors
app.use(cors({origin:"http://localhost:3000", exposedHeaders:["token"]}))

// cookie Parser
app.use(cookieParser());

// serve static files/pages
app.use(express.static("upload"))
app.use(express.static("Views/build"))

// BUILD
app.get("/", (req, res) =>{
  res.sendFile("./Views/build/index.html", {root: "."})
})

// -----------ROUTES------------
// home
app.get("/", (req, res) => {
  res.send("hello at Home");
});
app.use("/users",upload.single("image"), userRoutes);
app.use("/records", recordsRoutes);
app.use("/orders", otherRoutes);
// 404
app.use((req, res, next) => {
  res.status(404).sendFile("./Views/pageNotFound.html", { root: "." });
});

// universal error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ success: false, message: error });
});

// Listen
app.listen(PORT, () => console.log("Server is running on port: ", PORT));
