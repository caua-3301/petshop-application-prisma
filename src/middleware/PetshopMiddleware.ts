import { NextFunction, Request, Response } from "express"
import { PetshopDAO } from "../model/dao/PetshopDAO"
import { PetshopService } from "../service/PetshopService";

export class PetshopMiddleware {

    //maped to POST
    public async save(req:Request, res:Response, next:NextFunction) {
        const { name, cnpj } = req.body as {name: string, cnpj:string}

        const petshopService = new PetshopService();

        try {
            const petshopToSave:PetshopDAO = new PetshopDAO(name , cnpj);
            const petshopCreated = await petshopService.save(petshopToSave);
            res.status(201).send(petshopCreated)
            
        } catch (error) {
            //cnpj format problem
            res.status(400).send({
                message: "o formato do cnpj é inválido ou já está cadastrado"
            })
        }
    }

        //finding
        public findByCnpj = async (req:Request, res:Response, next:NextFunction) => {
            const { cnpj } = req.query as {cnpj: string};

            const petshopService = new PetshopService();

            try {
                const response = await petshopService.findByCnpj(cnpj);
                res.status(200).send(response);
            } catch (error) {
                res.status(400).send({
                    erro: error
                })
            }
        }
}
