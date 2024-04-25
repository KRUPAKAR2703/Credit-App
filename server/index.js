import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";

/*  Data imports  */
import User from "./models/User.js";
import Loan from "./models/Loan.js";
import {
  dataUser,
  dataLoan,
} from "./data/index.js";

/*  Configuration  */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/client", clientRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL + 'loanmanagerdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(` Server Port: ${PORT}`));

    /*  only add data one time */

    //  client
    // Loan.insertMany(dataLoan);
    // User.insertMany(dataUser);

  })
  .catch((error) => console.log(` ${error} did not connect`));
