import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editIncome, newIncome } from 'src/app/models/income';
import { CropsService } from 'src/app/services/crops.service';
import { IncomesService } from 'src/app/services/incomes.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  public title: string = "Nuevo ingreso";
  public btnTxt: String = "Agregar";
  public addIncomeForm!: FormGroup;
  cropID: number = 0;

  constructor(private formBuilder: FormBuilder, private incomesService: IncomesService, 
    private cropsService: CropsService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddIncomeComponent>) { }

  ngOnInit(): void {
    this.addIncomeForm = this.initForm();
    if(this.editData){
      this.title = "Editar ingreso"
      this.btnTxt = "Actualizar"
      console.log(this.editData + " - Nombre del boton: "  +this.btnTxt)
      this.addIncomeForm.controls['id'].setValue(this.editData.idIngreso);
      this.addIncomeForm.controls['name'].setValue(this.editData.nombreIngreso);
      this.addIncomeForm.controls['date'].setValue(this.editData.fechaIngreso);
      this.addIncomeForm.controls['value'].setValue(this.editData.valorIngreso);
      this.addIncomeForm.controls['quantity'].setValue(this.editData.fechaIngreso);
      this.addIncomeForm.controls['description'].setValue(this.editData.fechaIngreso);
    }
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  action(){
    if(this.btnTxt === 'Actualizar'){
      this.editIncome();
    }else{
      this.addIncome();
    }
  }

  editIncome(){
    const editIncome: editIncome = {
      incomeId: this.addIncomeForm.value.id,
      name: this.addIncomeForm.value.name,
      date: this.addIncomeForm.value.date,
      value: this.addIncomeForm.value.value,
      quantity: this.addIncomeForm.value.quantity,
      description: this.addIncomeForm.value.description
    }

    this.incomesService.editIncomes(editIncome).subscribe({
      next: (res) =>{
        this.dialogRef.close('updateIncome')
      },
      error: (err) =>{
        this.dialogRef.close('updateIncome')
        console.log(err)
      }
    })
  }

  addIncome(){
    this.cropsService.selectedCrop$.subscribe(actualCrop => this.cropID = actualCrop.idCultivo)
    const newIncome: newIncome = {
      cropId: this.cropID,
      name: this.addIncomeForm.value.name,
      date: this.addIncomeForm.value.date,
      value: this.addIncomeForm.value.value,
      quantity: this.addIncomeForm.value.quantity,
      description: this.addIncomeForm.value.description,
    }
    this.incomesService.addIncome(newIncome)
      .subscribe(data => {
        this.dialogRef.close('saveIncome')
      }
    );
  }

}
