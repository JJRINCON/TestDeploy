import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Income } from 'src/app/models/income';
import { CropsService } from 'src/app/services/crops.service';
import { IncomesService } from 'src/app/services/incomes.service';
import { AddIncomeComponent } from '../add-income/add-income.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'description', 'quantity','total', "options"];
  dataSource!: MatTableDataSource<Income>;
  incomes!: Income[];
  cropID: number = 0;
  stage$ = this.cropsService.selectedStage;
  crop$ = this.cropsService.selectedCrop$;
  total: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public AddIncomeComponent: MatDialog, private IncomesService: IncomesService, private cropsService: CropsService) { }

  ngOnInit(): void {
    this.getIncomes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openDialogAddincome(){
    this.AddIncomeComponent.open(AddIncomeComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'saveIncome'){
        this.getIncomes();
      }
    })
  }

  editIncome(row: any){
    this.AddIncomeComponent.open(AddIncomeComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'updateIncome'){
        this.getIncomes();
      }
    })
  }

  deleteincome(incomeID: number){
    this.IncomesService.deleteIncome(incomeID).subscribe({
      next: (res) =>{
        this.getIncomes();
      },
      error: (err) => {
        this.getIncomes();
        console.log(err)
      }
    });
  }
  

  getIncomes(){
    this.cropsService.selectedCrop$.subscribe(selectCropInfo => this.cropID = selectCropInfo.idCultivo);
    this.IncomesService.getIncomes(this.cropID).subscribe({
      next: (res: any) =>{
        this.incomes = res.incomes;
        this.total = res.total;
        this.dataSource = new MatTableDataSource(this.incomes);
        this.dataSource.paginator = this.paginator;
        console.log(this.incomes)
      }
    });
  }
}
