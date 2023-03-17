import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCrop, NewCrop } from 'src/app/models/crop';
import { CropsService } from 'src/app/services/crops.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-crop',
  templateUrl: './add-crop.component.html',
  styleUrls: ['./add-crop.component.css']
})
export class AddCropComponent implements OnInit {

  public title: string = "Nuevo Cultivo";
  public btnTxt: String = "Agregar";
  public addCropForm!: FormGroup;
  userID: number = 0;

  constructor(private formBuider: FormBuilder, private cropsService: CropsService, private loginService: LoginService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<AddCropComponent>) { }

  ngOnInit(): void {
    this.addCropForm = this.initForm();
    if(this.editData){
      this.title = "Editar Cultivo"
      this.btnTxt = "Actualizar"
      this.addCropForm.controls['id'].setValue(this.editData.id)
      this.addCropForm.controls['name'].setValue(this.editData.name);
      this.addCropForm.controls['description'].setValue(this.editData.description);
    }
  }

  action(){
    console.log(this.btnTxt + " - " + this.editData)
    if(this.btnTxt === 'Actualizar'){
      this.editCrop();
    }else{
      this.addCrop();
    }
  }

  editCrop(){
    const editCrop: EditCrop = {
      id: this.addCropForm.value.id,
      name: this.addCropForm.value.name,
      description: this.addCropForm.value.description
    }
    this.cropsService.editCrop(editCrop).subscribe({
      next: (res) =>{
        this.dialogRef.close('updateCrop')
      },
      error: (err) =>{
        this.dialogRef.close('updateCrop')
        console.log(err)
      }
    })
  }

  addCrop(){
    this.loginService.actualUserInfo$.subscribe(userInfo => this.userID = userInfo.userID)
    const newCrop: NewCrop = {
      userID: this.userID,
      name: this.addCropForm.value.name,
      description: this.addCropForm.value.description
    }
    this.cropsService.addCrop(newCrop).subscribe(data =>{
      this.dialogRef.close('save')
    });
  }

  initForm(): FormGroup{
    return this.formBuider.group({
      id:[],
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
}