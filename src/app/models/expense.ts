export class Expense{
    idGasto!: number;
    nombreGasto!: string;
    tipoGasto!: string;
    valorGasto!: number;
    descripcionGasto!: string;
    etapa!: string;
    idCultivo!: number;
    idTrabajador!: number;
    estado!: string;
    estadoPago!: string;
    fechaGasto!: Date;
    numeroJorbul!: number;
    calorUnidad!: number;
    idCultivoNavigation!: string;
    idTrabajadorNavigation!: string;
}

export class LaborExpense extends Expense{
    workerName!: string;
}

export class NewExpense{
    name!: string;
    type!: string;
    value!: number;
    description!: string;
    stage!: string;
    paidState!: string;
    cropID!: number;
    workerName!: string;
    jorbulNumber!: number;
    unitValue!: number;
    date!: Date;
}

export class EditExpense{
    id!: number;
    name!: string;
    description!: string;
    paidState!: string;
    workerName!: string;
    cropID!: number;
    date!: Date;
    value!: number;
    unitValue!: number;
    jorbulNumber!: number;
    type!: string;
}