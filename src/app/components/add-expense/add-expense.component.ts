import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditExpense, NewExpense } from 'src/app/models/expense';
import { CropsService } from 'src/app/services/crops.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  public title: string = "Nuevo Gasto";
  public btnTxt: string = "Agregar";
  public addExpenseForm!: FormGroup;
  stage$ = this.cropsService.selectedStage;
  crop$ = this.cropsService.selectedCrop$;
  cropID: number = 0;
  type: string = "";

  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService, private cropsService:CropsService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<AddExpenseComponent>) { }

  ngOnInit(): void {
    this.verifyType();
    this.addExpenseForm = this.initForm();
    if(this.editData.expense){
      this.verifyTitleEdit();
      this.btnTxt = "Actualizar";
      this.addExpenseForm.controls['id'].setValue(this.editData.expense.idGasto);
      this.addExpenseForm.controls['name'].setValue(this.editData.expense.nombreGasto);
      this.addExpenseForm.controls['value'].setValue(this.editData.expense.valorGasto);
      this.addExpenseForm.controls['description'].setValue(this.editData.expense.descripcionGasto);
      this.addExpenseForm.controls['date'].setValue(this.editData.expense.fechaGasto);
      var paidState = this.editData.expense.estadoPago === "S" ? true : false
      this.addExpenseForm.controls['paidState'].setValue(paidState);
    }
  }

  verifyType(){
    if(this.editData.type){
      this.type = this.editData.type
      console.log(this.type)
      this.verifyTitleAdd();
    }
  }

  verifyTitleEdit(){
    if(this.type === "IN"){
      this.title = "Editar Gasto Insumos"
    }else{
      this.title = "Editar Gasto"
    }
  }

  verifyTitleAdd(){
    if(this.type === "IN"){
      this.title = "Agregar Gasto Insumos"
    }else{
      this.title = "Agregar Gasto"
    }
  }

  action(){
    if(this.btnTxt === 'Actualizar'){
      this.editExpense();
    }else{
      this.addCrop();
    }
  }

  addCrop(){
    var stage = ""
    this.cropsService.selectedStage.subscribe(selectstage => stage = selectstage);
    this.cropsService.selectedCrop$.subscribe(actualCrop => this.cropID = actualCrop.idCultivo)
    var paidState = this.addExpenseForm.value.paidState ? "S": "N";
    const newExpense: NewExpense = {
      name: this.addExpenseForm.value.name,
      type: this.type,
      value: this.addExpenseForm.value.value,
      description: this.addExpenseForm.value.description,
      stage: stage.substring(0,2).toUpperCase(),
      paidState: paidState,
      cropID: this.cropID, 
      workerName: "",
      jorbulNumber: 0,
      unitValue: 0,
      date: this.addExpenseForm.value.date
    }
    this.expensesService.addExpense(newExpense).subscribe({
      next: (res) =>{
        this.dialogRef.close('saveExpense')
      },
      error: (err) =>{
        this.dialogRef.close('saveExpense')
        console.log(err)
      }
    })
  }

  editExpense(){
    this.cropsService.selectedCrop$.subscribe(actualCrop => this.cropID = actualCrop.idCultivo)
    var paidState = this.addExpenseForm.value.paidState ? "S": "N";
    const editLaborExpense : EditExpense = {
      id: this.addExpenseForm.value.id,
      name: this.addExpenseForm.value.name,
      description: this.addExpenseForm.value.description,
      paidState: paidState,
      workerName: "",
      cropID: this.cropID,
      date: this.addExpenseForm.value.date,
      value: this.addExpenseForm.value.value,
      unitValue: 0,
      jorbulNumber: 0,
      type: this.type
    }
    this.expensesService.editExpense(editLaborExpense).subscribe({
      next: (res) =>{
        this.dialogRef.close('updateExpense')
      },
      error: (err) =>{
        this.dialogRef.close('updateExpense')
        console.log(err)
      }
    })
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      value: ['', Validators.required],
      description: ['', Validators.required],
      date: [Validators.required],
      paidState: [false]
    });
  }
}