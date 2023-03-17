import { Component, OnInit } from '@angular/core';
import { CropReport } from 'src/app/models/report';
import { CropsService } from 'src/app/services/crops.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-crops-reports',
  templateUrl: './crops-reports.component.html',
  styleUrls: ['./crops-reports.component.css']
})
export class CropsReportsComponent implements OnInit {

  reports!: any[]; 
  userID: number = 0;

  constructor(private cropsService: CropsService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID);
    this.cropsService.getCropsReports(this.userID).subscribe({
      next: (res: any) => {
        this.reports = res.reports
      }
    });
  }
}
