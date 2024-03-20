import { Express } from "express";
import Database from "../database";
import Product from "../entities/product";
import requestValidatation from "../middlewares/request-validation";
import { CreateProductRequest } from "../dto/product";

const productRoutes = (app: Express) => {
  const productRepo = Database.getRepository(Product);

  app.post(
    "/products",
    requestValidatation(CreateProductRequest),
    async (req, res) => {
      const product = req.body;
      const newProduct = new Product();
      newProduct.title = product.title;
      newProduct.amount = product.amount;
      newProduct.created_by = product.created_by;
      newProduct.cruncy_code = product.cruncy_code;

      const newlyCreatedProduct = await productRepo.save(newProduct);
      res.json(newlyCreatedProduct);
    }
  );
};
export default productRoutes;
