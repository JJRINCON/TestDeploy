import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSeedling, faUsers, faChartPie, faUser, faDoorOpen} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  cropIcon = faSeedling;
  usersIcon = faUsers;
  reportsIcon = faChartPie;
  userIcon = faUser;
  exitIcon = faDoorOpen;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCrops(){
    this.router.navigate(['/crops'])
  }

  goToWorkers(){
    this.router.navigate(['/workers'])
  }

  goToReports(){
    this.router.navigate(['/reports'])
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}