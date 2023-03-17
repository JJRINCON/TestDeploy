import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 
import { UserInfo } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.initForm();
  }

  login(){
    var password = CryptoJS.SHA256(this.formLogin.value.password).toString();
    this.loginService.login(this.formLogin.value.userName, password).subscribe({
      next: (res: any) =>{
        localStorage.setItem('token', res.token)
        const userInfo: UserInfo = {
          userID: res.userID,
          names: res.names
        }
        this.loginService.setUserInfo(userInfo);
        this.router.navigate(['main'])
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
     userName: ['', [Validators.required]],
     password: ['', Validators.required]
   });
 }
}

