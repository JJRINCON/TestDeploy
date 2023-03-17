import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterInfo } from 'src/app/models/register';
import { LoginService } from 'src/app/services/login.service';
import * as CryptoJS from 'crypto-js'; 
import { UserInfo } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.formRegister = this.initForm();
  }

  register(){
    var password = CryptoJS.SHA256(this.formRegister.value.password).toString();
    const registerInfo: RegisterInfo = {
      names: this.formRegister.value.names,
      lastNames: this.formRegister.value.lastNames,
      userName: this.formRegister.value.userName,
      password: password
    }
    this.loginService.register(registerInfo).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        const userInfo: UserInfo = {
          userID: res.userID,
          names: res.names
        }
        this.loginService.setUserInfo(userInfo);
        this.router.navigate(['/main'])
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
   });
  }
}