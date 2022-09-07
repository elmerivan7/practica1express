const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();
//routes
productRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct);
productRouter.route("/:id").get(productController.getProductById);
productRouter.route("/:id").put(productController.modificaProductoId)
productRouter.route("/:id").delete(productController.borrarProductoId)

module.exports = productRouter;