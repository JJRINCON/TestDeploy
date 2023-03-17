import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/models/expense';
import { CropsService } from 'src/app/services/crops.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { AddLaborExpenseComponent } from '../add-labor-expense/add-labor-expense.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Expense>;
  expenses!: Expense[];
  cropID: number = 0;
  expenseType: string = "MO";
  stage$ = this.cropsService.selectedStage;
  crop$ = this.cropsService.selectedCrop$;
  total: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private expensesService: ExpensesService, private cropsService: CropsService,
              private addExpenseDialog: MatDialog) { 
                          this.verifyType();
  }

  verifyType(){
    if(this.expenseType === "MO"){
      this.displayedColumns = ['name', 'date', 'description' ,'paid', 'total', 'worker', 'options'];
    }else{
      this.displayedColumns = ['name', 'date', 'description' ,'paid', 'total', 'options'];
    }
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  selectType(expenseType: string){
    this.expenseType = expenseType;
    this.verifyType();
    this.getExpenses();
  }
  
  openDialog(){
    if(this.expenseType === "MO"){
      this.openAddLaborExpenseDialog();
    }else{
      this.openAddExpenseDialog()
    }
  }

  openAddLaborExpenseDialog(){
    this.addExpenseDialog.open(AddLaborExpenseComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if(val === 'saveLaborExpense'){
        this.getExpenses();
      }
    });
  }

  openAddExpenseDialog(){
    this.addExpenseDialog.open(AddExpenseComponent, {
      width: '40%',
      data: {
        type: this.expenseType
      }    
    }).afterClosed().subscribe(val => {
      if(val === 'saveExpense'){
        this.getExpenses();
      }
    });
  } 

  openEditDialog(row: any){
    if(this.expenseType === "MO"){
      this.editLaborExpense(row);
    }else{
      this.editExpense(row);
    }
  }

  editLaborExpense(row: any){
    this.addExpenseDialog.open(AddLaborExpenseComponent,{
      width:'50%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'updateLaborExpense'){
        this.getExpenses();
      }
    })
  }

  editExpense(row: any){
    this.addExpenseDialog.open(AddExpenseComponent,{
      width:'40%',
      data: {
        expense: row
      }
    }).afterClosed().subscribe(val =>{
      if(val === 'updateExpense'){
        this.getExpenses();
      }
    })
  }

  deleteExpense(expenseID: number){
    this.expensesService.deleteExpense(expenseID).subscribe({
      next: (res) =>{
        this.getExpenses();
      },
      error: (err) => {
        this.getExpenses();
        console.log(err)
      }
    });
  }
  

  getExpenses(){
    this.cropsService.selectedCrop$.subscribe(selectCropInfo => this.cropID = selectCropInfo.idCultivo);
    var stage = "";
    this.stage$.subscribe({
      next: (value) =>{
        stage = value
      } 
    });
    this.expensesService.getExpenses(this.cropID, stage.substring(0,2).toUpperCase(), this.expenseType).subscribe({
      next: (res: any) =>{
        this.expenses = res.expenses;
        this.total = res.total;
        this.dataSource = new MatTableDataSource(this.expenses);
        this.dataSource.paginator = this.paginator;
        console.log(this.expenses)
        console.log("fecha: ", res.date)
      }
    });
  }
}
