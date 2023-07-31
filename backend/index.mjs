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

app.use('/api/v1' , productRouter);
app.use(express.static(path.join(_dirname , "./public/index.html")))


//database connection

const connectionString = process.env.ATLAS_URI || "mongodb+srv://mabdullah2037:bustop123@todo-app.b5uowbs.mongodb.net/";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("database connected")
} catch(e) {
  console.error(e);
}

//port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let db = conn.db("sample_training");

export default db;