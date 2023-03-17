import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CropReport } from 'src/app/models/report';

@Component({
  selector: 'app-crop-report',
  templateUrl: './crop-report.component.html',
  styleUrls: ['./crop-report.component.css']
})
export class CropReportComponent implements OnInit {

  @Input() report!: CropReport;
  data!: any[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  title: string = "";
  legendPosition: any = 'below';
  legendtitle: any = 'Gastos';

  constructor() {
  }

  initData(){
    this.data = [
      {
        name: "Mano de obra",
        value: this.report.totalLaborExpenses
      },
      {
        name: "Insumos",
        value: this.report.totalSuppliesExpenses
      },
      {
        name: "Otros",
        value: this.report.totalOthersExpenses
      }
    ]
  }

  ngOnInit(): void {
    this.title = this.report.cropName
    this.initData()
  }
}
