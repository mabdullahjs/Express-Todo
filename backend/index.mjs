import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express from "express";
import { productRouter } from "./routes/productRoute.mjs";
import cors from "cors"
import path from "path"

const _dirname = path.resolve();

//dot env config
dotenv.config();

//express middleware
const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/v1', productRouter);

// Serve static files from the 'build' folder
app.use(express.static(path.join(_dirname, 'build')));

// This route will catch all other routes and serve the 'index.html' from the 'build' folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



//database connection

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("database connected")
} catch (e) {
  console.error(e);
}

//port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let db = conn.db("sample_training");

export default db;