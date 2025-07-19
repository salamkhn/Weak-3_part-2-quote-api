import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter.js";
import { errorHandaler } from "./middleware/errorHandaler.js";
import { dbsCon } from "./db/dbCon.js";
import { quoteRouter } from "./routers/quoteRouters.js";
import { looger } from "./middleware/looger.js";
dbsCon();
const app = express();

//middlewares
app.use(express.json());
app.use(looger);
app.use(cors());

//users
app.use("/api/quote/user", userRouter);

//quotes
app.use("/api/quote", quoteRouter);

app.use(errorHandaler);
//listen
const port = process.env.PORT || 777;
app.listen(port, () => {
  console.log("server is running at  :", port);
});
