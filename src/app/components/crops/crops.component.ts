import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Crop } from 'src/app/models/crop';
import { CropsService } from 'src/app/services/crops.service';
import { LoginService } from 'src/app/services/login.service';
import { AddCropComponent } from '../add-crop/add-crop.component';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent implements OnInit {

  crops!: Crop[];
  userID: number = 0;

  constructor(private cropsService: CropsService, public addCropDialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getCrops();
  }

  getCrops(){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID);
    this.cropsService.getCrops(this.userID).subscribe(
      data => {
        console.log(data)
        this.crops = data;
      }
    );
  }

  openAddCropDialog(){
    this.addCropDialog.open(AddCropComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getCrops();
      }
    })
  }

  updateCrops() {
    this.getCrops()
  }
}
