import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropsReportsComponent } from './components/crops-reports/crops-reports.component';
import { CropsComponent } from './components/crops/crops.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { StagesComponent } from './components/stages/stages.component';
import { WorkersComponent } from './components/workers/workers.component';
import { GuardGuard } from './guards/guard.guard';


const routes: Routes = [{path: '', redirectTo: 'login', pathMatch: 'full'},
                        {path: 'login', component: LoginComponent},
                        {path: 'register', component: RegisterComponent},
                        {path: 'main', component: MainComponent, canActivate:[GuardGuard]},
                        {path: 'crops', component: CropsComponent, canActivate:[GuardGuard]},
                        {path: 'workers', component: WorkersComponent, canActivate:[GuardGuard]},
                        {path: 'stages', component: StagesComponent, canActivate:[GuardGuard]},
                        {path: 'expenses', component: ExpensesComponent, canActivate:[GuardGuard]},
                        {path: 'incomes', component: IncomesComponent, canActivate:[GuardGuard]},
                        {path: 'reports', component: CropsReportsComponent, canActivate:[GuardGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
