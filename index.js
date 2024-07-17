const express = require("express");
const app = express();

require("dotenv").config();
const PORT = 4000;

app.use(express.json()); 

const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

const dbConnect = require("./config/database");
dbConnect();

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const upload = require("./routes/fileupload");
app.use("/api/v1", upload );

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send('<h1>this is homepage</h1>');
});