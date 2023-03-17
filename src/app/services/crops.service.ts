import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crop, EditCrop, NewCrop } from '../models/crop';
import { CropReport } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class CropsService {

  initCropInfo: Crop = {
    idCultivo: 0,
    nombreCultivo: '',
    descripcionCultivo: ''
  }

  initStage: string = "";

  private selectCropInfo$ = new BehaviorSubject<Crop>(this.initCropInfo);
  private selectedStage$ = new BehaviorSubject<string>(this.initStage);

  url = 'https://localhost:44314/solanum/Crops'
  urlGET = 'https://localhost:44314/solanum/Crops?userID=';

  constructor(private http: HttpClient) { }

  getCrops(userID: number): Observable<Crop[]>{
    return this.http.get<Crop[]>(this.urlGET + userID);
  }

  addCrop(newCrop: NewCrop){
    return this.http.post<NewCrop>(this.url, newCrop);
  }

  editCrop(editCrop: EditCrop){
    return this.http.put(this.url, editCrop);
  }

  get selectedCrop$(): Observable<Crop>{
    return this.selectCropInfo$.asObservable();
  }

  setSelectedInfo(selectCrop: Crop): void{
    this.selectCropInfo$.next(selectCrop);
  }

  get selectedStage(): Observable<string>{
    return this.selectedStage$.asObservable();
  }

  setSelectedStage(selectStage: string): void{
    this.selectedStage$.next(selectStage);
  }

  deleteCrop(cropID: number){
    let params = new HttpParams();
    params = params.set('workerID', cropID);
    return this.http.patch("https://localhost:44314/solanum/Crops?cropID=" + cropID, {params: params})
  }

  getCropsReports(userID: number): Observable<CropReport[]>{
    return this.http.get<CropReport[]>('https://localhost:44314/solanum/Crops/Reports?userID=' + userID);
  }
}
