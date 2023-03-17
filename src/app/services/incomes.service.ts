import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Income, newIncome, editIncome } from '../models/income';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http: HttpClient) { }

  getIncomes(cropID: number): Observable<Income[]>{
    return this.http.get<Income[]>("https://localhost:44314/solanum/Incomes?IDCrop=" + cropID);
  }

  addIncome(newIncome: newIncome){
    console.log(newIncome)
    return this.http.post("https://localhost:44314/solanum/Incomes", newIncome);
  }

  editIncomes(editIncome: editIncome){
    return this.http.put("https://localhost:44314/solanum/Incomes", editIncome);
  }

  deleteIncome(incomeId: number){
    let params = new HttpParams();
    params = params.set('incomeID', incomeId);
    console.log(params.toString());
    return this.http.patch("https://localhost:44314/solanum/Incomes?incomeID=" + incomeId, {params: params})
  }
}
