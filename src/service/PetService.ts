import { Sql } from "@prisma/client/runtime/library";
import { PetDAO } from "../model/dao/PetDAO";
import prismaClient from "../prisma/prismaClient";
import { PetshopService } from "./PetshopService";
import { Petshop } from "@prisma/client";

export class PetService {

    private petshopService = new PetshopService();

    public async save(pet:PetDAO, cnpj: string) {

        //checking cnpj
        if ((await this.petshopService.checkExistsUserAccount(cnpj)) ) {

            const petshopReference = await this.petshopService.findByCnpj(cnpj);

            const petSaved = prismaClient.pet.create({
                data: {
                    ...pet.getData(),
                    petshops: {
                        connect: { id: petshopReference?.id}
                    }
                }
            })

            return petSaved;
        }

        throw new Error("CNPJ não está associado a um petshop cadastrado");
    }

    public async findAll(cnpj: string) {

       const pesthopWithPets = await prismaClient.petshop.findFirst({
            where: {
                cnpj: cnpj
            },
            include: {
                pets: true
            }
       })

       if (pesthopWithPets != null) {
            return pesthopWithPets.pets;
       }

       throw new Error();
    }

    public update = async (id: string, petDAO: PetDAO) => {
        const petData = petDAO.getData();

        const response = prismaClient.pet.update({
            where: {
                id: id
            },
            data: {
                name: petData.name,
                type: petData.type,
                description: petData.description,
                deadline_vaccination: petData.deadline_vaccination
            }
        })

        if (response != null) {
            return response;
        }

        throw new Error();
    }

    public updateOne = async (id: string) => {
        const response = await prismaClient.pet.update({
            where: {
                id: id
            },
            data: {
                vaccinated: true
            }
        })

        if (response != null) {
            return {
                vaccinated: response.vaccinated
            }
        }

        throw new Error();
    }

    public remove = async (id: string) => {
        const response = prismaClient.pet.delete({
            where: {
                id: id
            }
        })

        if (response != null) {
            return response;
        }

        throw new Error();
    }
}