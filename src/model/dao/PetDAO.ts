export class PetDAO {
    private name: string;
    private type: string;
    private description: string;
    private deadline_vaccination: Date;

    constructor (name: string, type: string, description: string, deadline_vaccination: Date) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.deadline_vaccination = deadline_vaccination;
    }

    public getData () {
        return {
            name: this.name,
            type: this.type,
            description: this.description,
            deadline_vaccination: new Date(this.deadline_vaccination)
        }
    }

}