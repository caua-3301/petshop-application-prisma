export class PetshopDAO {
    private name: string;
    private cnpj: string;

    constructor (name: string, cnpj: string) {
        this.name = name;
        this.cnpj = cnpj;
    }

    public getData() {
        return {
            name: this.name,
            cnpj: this.cnpj
        }
    }

    public getCnpj(): string {
        return this.cnpj;
    }
}