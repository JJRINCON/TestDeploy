export class Worker{
    idTrabajador!: number
    nombreTrabajador!: string
    numeroContacto!: string
}

export class NewWorker{
    BossID!: number
    Name!: string
    ContactNumber!: string
}

export class EditWorker extends NewWorker{
    id!: number
}