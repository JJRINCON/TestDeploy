import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditExpense, Expense, LaborExpense, NewExpense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  getExpenses(cropID: number, stage: string, type: string): Observable<Expense[]>{
    if(type === "MO"){
      return this.http.get<LaborExpense[]>('https://localhost:44314/solanum/Expenses?cropID=' + cropID + '&stage=' + stage + '&type=' + type);
    }else{
      return this.http.get<Expense[]>('https://localhost:44314/solanum/Expenses?cropID=' + cropID + '&stage=' + stage + '&type=' + type);
    }
  }

  addExpense(newExpense: NewExpense){
    console.log(newExpense)
    return this.http.post('https://localhost:44314/solanum/Expenses', newExpense);
  }

  editExpense(editExpense: EditExpense){
    return this.http.put('https://localhost:44314/solanum/Expenses', editExpense);
  }

  deleteExpense(expenseID: number){
    return this.http.patch('https://localhost:44314/solanum/Expenses?expenseID=' + expenseID, {});
  }
}
