import { Router } from "express";
import { PetMiddleware } from "../middleware/PetMiddleware";

const petRouter = Router();

//Midd class
const petMiddleware = new PetMiddleware();

petRouter.post('/', petMiddleware.save);
petRouter.get('/', petMiddleware.findAll);
petRouter.put('/:id', petMiddleware.update);
petRouter.patch('/:id/vaccinated', petMiddleware.updateOne);
petRouter.delete('/:id', petMiddleware.remove);

export default petRouter;