import db from "../index.mjs";
import { ObjectId } from "mongodb";

// get all product
const getProducts = async (req, res) => {
    let collection = db.collection("products");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
}

// get single product
const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const query = { _id: new ObjectId(id) };
        const products = db.collection("products");
        const data = await products.findOne(query);
        if (!data) throw Error("Product Not Found!");
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//post product 
const sendProduct = async (req, res) => {
    let collection = db.collection("products");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const price = Number(req.body.price);
  
    // Validation
    if ((!name && !price && !description)) {
      res.status(403).send("parameterMissing");
      return;
    }
  
    if (price && isNaN(price)) {
      res.status(403).send("Price missing");
      return;
    }
    if (name && typeof name !== "string") {
      res.status(403).send("Name missing");
      return;
    }
    if (description && typeof description !== "string") {
      res.status(403).send("description missing");
      return;
    }
  
    try {
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { name, price, description } };
      const products = db.collection("products");
      const data = await products.updateOne(filter, updateDoc);
  
      if (!data.matchedCount) throw Error("Product Not Found!");
  
      res.status(201).send({ message: "Product updated" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };


  const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const products = db.collection("products");
      const query = { _id: new ObjectId(id) };
      const result = await products.deleteOne(query);
  
      if (!result.deletedCount)
        throw new Error("No documents matched the query. Deleted 0 documents.");
  
      res.status(201).send({ message: "Successfully deleted one document." });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

export { sendProduct, getProduct, getProducts, updateProduct, deleteProduct }