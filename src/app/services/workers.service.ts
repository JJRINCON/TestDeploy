import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditWorker, NewWorker, Worker } from '../models/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  url = 'https://localhost:7044/solanum/Workers'
  urlGET = 'https://localhost:7044/solanum/Workers?bossID='

  constructor(private http: HttpClient) { }

  getWorkers(userID: number): Observable<Worker[]>{
    return this.http.get<Worker[]>(this.urlGET + userID);
  }

  addWorker(newWorker: NewWorker){
    return this.http.post<NewWorker>(this.url, newWorker);
  }

  editWorker(editWorker: EditWorker){
    return this.http.put(this.url, editWorker);
  }

  deleteWorker(bossID: number, workerID: number){
    let params = new HttpParams();
    params = params.set('workerID', workerID);
    params = params.set('bossID', bossID);
    console.log(params.toString());
    return this.http.patch("https://localhost:44314/solanum/Workers?workerID=" + workerID + "&bossID=" + bossID, {params: params})
  }
}