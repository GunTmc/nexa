import express from "express";
import dotenv from "dotenv";
import api from "./src/routes/api.js";

dotenv.config();
const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// routers
app.use('/api', api)
