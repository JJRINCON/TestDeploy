import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditWorker, NewWorker } from 'src/app/models/worker';
import { LoginService } from 'src/app/services/login.service';
import { WorkersService } from 'src/app/services/workers.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  public title: string = "Nuevo Trabajador";
  public btnTxt: String = "Agregar";
  public addWorkerForm!: FormGroup;
  userID: number = 0;

  constructor(private formBuilder: FormBuilder, private workersService: WorkersService, 
             private loginService: LoginService, @Inject(MAT_DIALOG_DATA) public editData: any,
             private dialogRef: MatDialogRef<AddWorkerComponent>) { }

  ngOnInit(): void {
    this.addWorkerForm = this.initForm();
    if(this.editData){
      this.title = "Editar Trabajador"
      this.btnTxt = "Actualizar"
      console.log(this.editData + " - Nombre del boton: "  +this.btnTxt)
      this.addWorkerForm.controls['id'].setValue(this.editData.idTrabajador)
      this.addWorkerForm.controls['name'].setValue(this.editData.nombreTrabajador);
      this.addWorkerForm.controls['contact'].setValue(this.editData.numeroContacto);
    }
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      contact: ['', Validators.required]
    })
  }

  action(){
    if(this.btnTxt === 'Actualizar'){
      this.editWorker();
    }else{
      this.addWorker();
    }
  }

  editWorker(){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID)
    const editWorker: EditWorker = {
      id: this.addWorkerForm.value.id,
      BossID: this.userID,
      Name: this.addWorkerForm.value.name,
      ContactNumber: this.addWorkerForm.value.contact + ""
    }
    this.workersService.editWorker(editWorker).subscribe({
      next: (res) =>{
        this.dialogRef.close('updateWorker')
      },
      error: (err) =>{
        this.dialogRef.close('updateWorker')
        console.log(err)
      }
    })
  }

  addWorker(){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID)
    const newWorker: NewWorker = {
      BossID: this.userID,
      Name: this.addWorkerForm.value.name,
      ContactNumber: this.addWorkerForm.value.contact + ""
    }
    this.workersService.addWorker(newWorker)
      .subscribe(data => {
        this.dialogRef.close('saveWorker')
      }
    );
  }
}
