import { Petshop } from "@prisma/client";
import { PetshopDAO } from "../model/dao/PetshopDAO";
import prismaClient from "../prisma/prismaClient";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";

export class PetshopService {

    //check is exist
    public async findByCnpj(cnpj: string) {
        const petshop = await prismaClient.petshop.findFirst({
            where: {
                cnpj: cnpj
            }
        })

        return petshop;
    }

    public async checkExistsUserAccount(cnpj: string) {
        const petshop = this.findByCnpj(cnpj);

        return petshop != null;
    }

    //validate cnpj
    private checkCnpjFormat(cnpj: string) {
        return cnpjValidator.isValid(cnpj);
    }

    //save in the database
    public async save(petshop: PetshopDAO) {

        const cnpjToValidate = petshop.getCnpj();

        //checking cnpj format and, if exist in the database
        if (this.checkCnpjFormat(cnpjToValidate) && !(await this.checkExistsUserAccount(cnpjToValidate)) ) {
            const petshopSaved = await prismaClient.petshop.create({
                data: petshop.getData()
            })

            return petshopSaved;
        }

        throw new Error("formato do cnpj não é válido ou já está cadastrado!");
    }
}