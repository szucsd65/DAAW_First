require("dotenv").config({ path: "variables.env" });
const express = require("express");
const router = require("./routes/apiRouter");
const mongoose = require("mongoose");
const errorHandler = require("./errors/errorHandlers");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
}).catch(err=>{
process.exit(-1);
});

app.use("/equipments", router);

if (app.get("env") === "development") {
    app.use(errorHandler.developmentErrors);
}
else{
    app.use(errorHandler.productionErrors);
}

module.exports = app;

