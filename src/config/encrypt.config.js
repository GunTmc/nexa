import pkg from "crypto-js";
import dotenv from "dotenv";

const { AES, enc } = pkg;
dotenv.config();

// eslint-disable-next-line no-undef
const SECRET_KEY = process.env.SECRET_KEY || "nexatest";

const encryptAES = (data) => {
  return AES.encrypt(data, SECRET_KEY).toString();
};

const decryptAES = (encryptedData) => {
  const bytes = AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(enc.Utf8);
};

export default { encryptAES, decryptAES };