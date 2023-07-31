import express from "express";
import { deleteProduct, getProduct, getProducts, sendProduct, updateProduct } from "../controller/productController.mjs";

const router = express.Router();

//get all data
router.get('/products' , getProducts);

//get single data
router.get('/product/:id' , getProduct);

//send data
router.post('/product' , sendProduct);

//update data
router.put('/product/:id' , updateProduct)

//delete data
router.delete('/product/:id' , deleteProduct)


export {router as productRouter }