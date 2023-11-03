import multer from "multer";
import path from "path";
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDirectory = path.join(__dirname, '../public/images')
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname
        );
    },
});

export const multerMid = multer({
    storage: storage,
});