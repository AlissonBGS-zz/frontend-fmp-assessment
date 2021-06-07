import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  service:any = [];

  constructor(public serv:ServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getService(this.route.snapshot.paramMap.get("slug"));
  }

  getService(slug: string|null) {
    this.service = {};
    if(!slug) slug = '';
    this.serv.getServiceBySlug(slug).subscribe((data: any) => {
      this.service = data.service;
    }); 
  }

  goToCheckout(name: string, slug: string, tier: string|unknown, price: number|unknown) {
    this.router.navigate(['/checkout'], { state: { name, slug,  tier, price }});
  }
}
