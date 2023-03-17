import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Crop } from 'src/app/models/crop';
import { CropsService } from 'src/app/services/crops.service';
import { AddCropComponent } from '../add-crop/add-crop.component';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {

  @Input() id!: number;
  @Input() name!: string;
  @Input() description!: string;
  @Output() updateEvent = new EventEmitter<string>();

  constructor(private route: Router, public addCropDialog: MatDialog, private cropsService: CropsService) { }

  ngOnInit(): void {
  }

  goToStages(){
    const crop: Crop = {
      idCultivo: this.id,
      nombreCultivo: this.name,
      descripcionCultivo: this.description
    }
    this.cropsService.setSelectedInfo(crop);
    this.route.navigate(['stages'])
  }

  editCrop(){
    this.addCropDialog.open(AddCropComponent,{
      width:'30%',
      data: {
            id: this.id,
            name: this.name, 
            description: this.description
          }
    }).afterClosed().subscribe(val =>{
      if(val === 'updateCrop'){
        this.updateCrops()
      }
    })
  }

  deleteCrop(){
    this.cropsService.deleteCrop(this.id).subscribe({
      next: (res) => {
        this.updateCrops();
      },
      error: (err) => {
        console.log(err)
        this.updateCrops()
      }
    });
  }

  updateCrops() {
    this.updateEvent.emit()
  }
}

