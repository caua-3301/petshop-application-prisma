import { NextFunction, Request, Response } from "express";
import { PetDAO } from "../model/dao/PetDAO";
import { PetService } from "../service/PetService";

export class PetMiddleware {
    
    public async save(req: Request, res: Response, next:NextFunction) {
        const {name,  type, description, deadline_vaccination} = req.body
        const {cnpj} = req.headers as {cnpj: string}

        const petService = new PetService();

        try {
            const petToSave = new PetDAO(name, type, description, deadline_vaccination);
            const petSaved = await petService.save(petToSave, cnpj);
            res.status(201).send(petSaved);
        } catch(error) {
            console.log(error);
            res.status(404).send({
                message: `petshop com o cnpj ${cnpj} não foi encontrado`
            })
        }
    }

    public async findAll(req: Request, res: Response, next:NextFunction) {
        const {cnpj} = req.headers as {cnpj: string};

        const petService = new PetService();

        try {
            const pets = await petService.findAll(cnpj);
            res.status(200).send(pets);

        } catch(error) {
            console.log(error);
            res.status(404).send({
                message: `petshop com o cnpj ${cnpj} não foi encontrado`
            })
        }
    }

    public update = async (req:Request, res:Response, next:NextFunction) => {
        const { name, type, description, deadline_vaccination } = req.body;
        const { id } = req.query as { id: string };

        const petService = new PetService();

        try {
            const petDAO = new PetDAO(name, type, description, deadline_vaccination);
            const response = await petService.update(id, petDAO);
            res.status(200).send(response);
        } catch (error) {
            res.status(404).send({
                erro: `Falha ao atualizar: ${error}`
            })
        }
    }

    public updateOne = async (req:Request, res:Response, next:NextFunction) => {
        const { id } = req.query as { id: string };

        const petService = new PetService();

        try {
            const response = await petService.updateOne(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(404).send({
                erro: `Animal nao encontrado: ${error}`
            })
        }
    }

    public remove = async (req:Request, res:Response, next:NextFunction) => {
        const { id } = req.query as { id: string };

        const petService = new PetService();

        try {
            const response = await petService.remove(id);
            res.status(200).send(response);
        } catch (error) {
            res.status(404).send({
                erro: `Animal nao encontrado: ${error}`
            })
        }
    }
}