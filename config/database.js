const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () => {
    if (!process.env.MONGODB_URL) {
        console.error("MONGODB_URL is not defined in the environment variables.");
        process.exit(1);
    }

    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.error("DB connection error:", error.message);
        process.exit(1);
    });
};

module.exports = dbconnect;
