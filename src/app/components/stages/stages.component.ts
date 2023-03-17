import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  crop$ = this.cropsService.selectedCrop$

  constructor(private cropsService: CropsService, private router: Router) {}

  ngOnInit(): void {
  }

  goToExpenses(stage: string){
    this.cropsService.setSelectedStage(stage);
    this.router.navigate(['expenses']);
  }

  goToIncomes(stage: string){
    this.cropsService.setSelectedStage(stage);
    this.router.navigate(['incomes']);
  }
}
