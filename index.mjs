import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express from "express";
import { productRouter } from "./routes/productRoute.mjs";
import cors from "cors"

//dot env config
dotenv.config();

//express middleware
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req , res)=>{
    res.send("hello server")
} );
app.use('/' , productRouter);


//database connection

const connectionString = process.env.ATLAS_URI || "";
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