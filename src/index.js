import "@babel/polyfill";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./Route/userRoute";
import newsRoute from "./Route/newsRoute";
import eventRoute from "./Route/eventRoute";
import admin from "./Route/AdminRoute";
import bookUser from "./Route/bookUseRoute";
import Comment from "./Route/commentRoute";
import subscribe from "./Route/subscribeRoute";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import reporting from "./Route/reportingRoute";
dotenv.config();
const { PORT } = process.env;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Succesfully connected to the database");
  })
  .catch((err) => {
    console.log("something went wrong", err);
    process.exit();
  });
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
// =======================swagger docs==========================
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API documentation",
      version: "1.0.0",
      description: `<h1>This is API  which deals with Events,News and Facilities booking in UR Huye Campus</h2>
                            <h3>Authors</h3>
                            <ol>
                            <li><a href="https://github.com/EricNiyo73">Mr Eric N</a></li>
                            <li><a href="https://github.com/utiheba-happy-janvier">Happy Janviere</a></li>
                            </ol>`,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          scheme: "bearer",
          name: "Authorization",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "https://urbackend.onrender.com",
      },
    ],
  },
  apis: ["./src/Docs/*.js"],
};
const specs = swaggerJSDoc(options);

// routes
app.use("/user", userRoutes);
app.use("/news", newsRoute);
app.use("/events", eventRoute);
app.use("/admin", admin);
app.use("/comment", Comment);
app.use("/subscribe", subscribe);
app.use("/userbooking", bookUser);
app.use("/reporting/", reporting);
app.use("/docsdocs", swaggerUI.serve, swaggerUI.setup(specs));
app.get("/", (req, res) => {
  return res.json({ message: "Welcome  I am testing again" });
});
export default app;
