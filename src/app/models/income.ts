export class Income{
    idIngreso!: number;
    nombreIngreso!: string;
    fechaIngreso!: Date;
    valorIngreso!: number;
    cantidad!: number;
    descripcionIngreso!: string;
    idCultivo!: number;
    estado!: string;
    idCultivoNavegation!: string;

}

export class newIncome{
    name!: string;
    date!: Date;
    value!: number;
    quantity!: number;
    description!: string;
    cropId!: number;
}

export class editIncome{
    name!: string;
    date!: Date;
    value!: number;
    quantity!: number;
    description!: string;
    incomeId!: number;
}