const File = require("../model/file");
const cloudinary = require("cloudinary").v2;

const uploadFile = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const file = req.files.file;
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.').pop()}`;

        await new Promise((resolve, reject) => {
            file.mv(path, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const isFileTypeSupported = (type, supportedTypes) => {
    return supportedTypes.includes(type);
};

const uploadFileToCloudinary = async (file, folder) => {
    const options = { folder };
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

const imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File not supported',
            });
        }

        const response = await uploadFileToCloudinary(file, "Abhihelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            image: response.secure_url,
        });

        res.json({
            success: true,
            message: 'Image successfully uploaded',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

const videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        if (!req.files ) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File not supported',
            });
        }

        const response = await uploadFileToCloudinary(file, "Abhihelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            image: response.secure_url,
        });

        res.json({
            success: true,
            message: 'Video successfully uploaded',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

module.exports = { uploadFile, imageUpload, videoUpload };
