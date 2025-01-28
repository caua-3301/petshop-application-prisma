import { Router } from "express";
import { PetshopMiddleware } from "../middleware/PetshopMiddleware";

const petshopRouter = Router();

//controller class
const petshopMiddleware = new PetshopMiddleware();

petshopRouter.post('/', petshopMiddleware.save);
petshopRouter.get('/:cnpj', petshopMiddleware.findByCnpj)

export default petshopRouter;