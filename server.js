const express = require("express");
const cors = require("cors");
const errorHandling = require("./middleware/errorhandling");

const dotenv = require("dotenv").config();
const connectDb = require("./config/dbconnection");

const app = express();

connectDb();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/contacts", require("./routes/contactroute"));
app.use("/api/user", require("./routes/userroutes"));

app.use(errorHandling);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});