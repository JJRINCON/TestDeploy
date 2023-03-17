import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  userName$ = this.loginService.actualUserInfo$;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  goToMain(){
    this.router.navigate(['/main'])
  }
}
