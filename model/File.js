const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: String,
    tags: String,
    email: String,
    image: String,
}, { timestamps: true });

fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC", doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `AbhiHelp`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello jee</h2>`,
        });
        
        console.log("INFO", info);
    } catch (error) {
        console.error(error);
    }
});

const File1 = mongoose.model('File', fileSchema);

module.exports = File1;
