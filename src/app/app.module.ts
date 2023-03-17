import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { CropsComponent } from './components/crops/crops.component';
import { CropComponent } from './components/crop/crop.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddCropComponent } from './components/add-crop/add-crop.component';
import { StagesComponent } from './components/stages/stages.component';
import { WorkersComponent } from './components/workers/workers.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddWorkerComponent } from './components/add-worker/add-worker.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddLaborExpenseComponent } from './components/add-labor-expense/add-labor-expense.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { CropReportComponent } from './components/crop-report/crop-report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CropsReportsComponent } from './components/crops-reports/crops-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    SidenavComponent,
    MainComponent,
    RegisterComponent,
    CropsComponent,
    CropComponent,
    AddCropComponent,
    StagesComponent,
    WorkersComponent,
    AddWorkerComponent,
    ExpensesComponent,
    AddExpenseComponent,
    AddLaborExpenseComponent,
    IncomesComponent,
    AddIncomeComponent,
    CropReportComponent,
    CropsReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    NgxChartsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
