import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditExpense, NewExpense } from 'src/app/models/expense';
import { CropsService } from 'src/app/services/crops.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-add-labor-expense',
  templateUrl: './add-labor-expense.component.html',
  styleUrls: ['./add-labor-expense.component.css']
})
export class AddLaborExpenseComponent implements OnInit {

  public title: string = "Nuevo Gasto Mano de Obra";
  public btnTxt: string = "Agregar";
  public addLaborExpenseForm!: FormGroup;
  public totalValue: number = 0;
  stage$ = this.cropsService.selectedStage;
  crop$ = this.cropsService.selectedCrop$;
  cropID: number = 0;


  constructor(private formBuilder: FormBuilder, private cropsService: CropsService, private expensesService: ExpensesService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<AddLaborExpenseComponent>) {}

  ngOnInit(): void {
    this.addLaborExpenseForm = this.initForm();
    this.addLaborExpenseForm.controls['numberOfJobs'].valueChanges.subscribe(val => {
      this.totalValue = val * this.addLaborExpenseForm.controls['unitValue'].value;
    })
    this.addLaborExpenseForm.controls['unitValue'].valueChanges.subscribe(val => {
      this.totalValue = val * this.addLaborExpenseForm.controls['numberOfJobs'].value;
    });
    if(this.editData){
      this.title = "Editar Gasto Mano de Obra"
      this.btnTxt = "Actualizar"
      console.log("Editar: ", this.editData)
      this.addLaborExpenseForm.controls['id'].setValue(this.editData.idGasto);
      this.addLaborExpenseForm.controls['name'].setValue(this.editData.nombreGasto);
      this.addLaborExpenseForm.controls['workerName'].setValue(this.editData.workerName);
      this.addLaborExpenseForm.controls['numberOfJobs'].setValue(this.editData.numeroJorbul);
      this.addLaborExpenseForm.controls['unitValue'].setValue(this.editData.calorUnidad);
      this.addLaborExpenseForm.controls['totalValue'].setValue(this.editData.numeroJorbul * this.editData.calorUnidad);
      this.addLaborExpenseForm.controls['date'].setValue(this.editData.fechaGasto);
      this.addLaborExpenseForm.controls['description'].setValue(this.editData.descripcionGasto);
    }
  }
  
  action(){
    if(this.btnTxt === 'Actualizar'){
      this.editLaborExpense();
    }else{
      this.addLaborExpense();
    }
  }

  addLaborExpense(){
    var stage = ""
    this.cropsService.selectedStage.subscribe(selectstage => stage = selectstage);
    this.cropsService.selectedCrop$.subscribe(actualCrop => this.cropID = actualCrop.idCultivo)
    const newLaborExpense: NewExpense = {
      name: this.addLaborExpenseForm.value.name,
      type: "MO",
      value: this.totalValue,
      description: this.addLaborExpenseForm.value.description,
      stage: stage.substring(0,2).toUpperCase(),
      paidState: "N",
      cropID: this.cropID, 
      workerName: this.addLaborExpenseForm.value.workerName,
      jorbulNumber: this.addLaborExpenseForm.value.numberOfJobs,
      unitValue: this.addLaborExpenseForm.value.unitValue,
      date: this.addLaborExpenseForm.value.date
    }
    this.expensesService.addExpense(newLaborExpense).subscribe({
      next: (res) =>{
        this.dialogRef.close('saveLaborExpense')
      },
      error: (err) =>{
        this.dialogRef.close('saveLaborExpense')
        console.log(err)
      }
    })
  }

  editLaborExpense(){
    this.cropsService.selectedCrop$.subscribe(actualCrop => this.cropID = actualCrop.idCultivo)
    const editLaborExpense : EditExpense = {
      id: this.addLaborExpenseForm.value.id,
      name: this.addLaborExpenseForm.value.name,
      description: this.addLaborExpenseForm.value.description,
      paidState: this.editData.estadoPago,
      workerName: this.addLaborExpenseForm.value.workerName,
      cropID: this.cropID,
      date: this.addLaborExpenseForm.value.date,
      value: this.totalValue,
      unitValue: this.addLaborExpenseForm.value.unitValue,
      jorbulNumber: this.addLaborExpenseForm.value.numberOfJobs,
      type: "MO"
    }
    this.expensesService.editExpense(editLaborExpense).subscribe({
      next: (res) =>{
        this.dialogRef.close('updateLaborExpense')
      },
      error: (err) =>{
        this.dialogRef.close('updateLaborExpense')
        console.log(err)
      }
    })
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      workerName: ['', Validators.required],
      unitValue: ['', Validators.required],
      numberOfJobs: ['', Validators.required],
      totalValue: [''],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
}
