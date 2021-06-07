import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  services:any = [];

  constructor(public service:ServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.service.getServices().subscribe((data: any) => {
      this.services = data.services;
    });
  }

  goToService(service_slug: string) {
    this.router.navigate([`/services/${service_slug}`]);
  }
}
