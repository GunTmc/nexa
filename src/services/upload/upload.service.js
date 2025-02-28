import fs from "fs";
import path from "path";

const UploadBase64 = (base64String, fileName, folderPath = "storage/upload") => {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const matches = base64String.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error("Invalid base64 format");
        }

        const extension = matches[1];
        const imageData = matches[2];

        const filePath = path.join(folderPath, `${fileName}.${extension}`);

        fs.writeFileSync(filePath, imageData, "base64");

        return filePath;
    } catch (error) {
        console.error("Error saving image:", error);
        return null;
    }
};

export default UploadBase64;
