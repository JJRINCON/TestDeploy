import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Worker } from 'src/app/models/worker';
import { LoginService } from 'src/app/services/login.service';
import { WorkersService } from 'src/app/services/workers.service';
import { AddWorkerComponent } from '../add-worker/add-worker.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'contact', 'options'];
  dataSource!: MatTableDataSource<Worker>;
  workers!: Worker[];
  userID: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public addWorkerDialog: MatDialog, private workersService: WorkersService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getWorkers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }    
  }

  openAddWorkerDialog(){
    this.addWorkerDialog.open(AddWorkerComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'saveWorker'){
        this.getWorkers();
      }
    })
  }

  editWorker(row: any){
    this.addWorkerDialog.open(AddWorkerComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'updateWorker'){
        this.getWorkers();
      }
    })
  }

  deleteWorker(workerID: number){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID)
    this.workersService.deleteWorker(this.userID, workerID).subscribe({
      next: (res) =>{
        this.getWorkers();
      },
      error: (err) => {
        this.getWorkers();
        console.log(err)
      }
    });
  }

  getWorkers(){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID)
    this.workersService.getWorkers(this.userID).subscribe({
      next: (res) =>{
        console.log(res)
        this.workers = res;
        this.dataSource = new MatTableDataSource(this.workers);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
}