export class Crop{
    idCultivo!: number
    nombreCultivo!: string
    descripcionCultivo!: string
}

export class NewCrop{
    userID!: number
    name!: string
    description!: string
}

export class EditCrop{
    id!: number
    name!: string
    description!: string
}