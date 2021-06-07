import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout/checkout.service';
import { Router } from '@angular/router';
import { checkoutService } from '../models/checkoutService';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  state: checkoutService;
  invalidForm: boolean = false;
  submited: boolean = false;
  submitErr: boolean = false;
  
  checkoutForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    zip_code: ['', Validators.required],
    payment_type: [''],
    service: [''],
  });

  constructor(
    public checkout:CheckoutService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    ){ 
      const navigation = this.router.getCurrentNavigation();
      this.state = navigation?.extras.state as {
        name: string,
        slug: string,
        tier: string|unknown, 
        price: string|unknown
      } || {

      };
  }
    
  ngOnInit(): void {
    if(this.state){
      window.localStorage.setItem("checkout", JSON.stringify(this.state));
    }
    else{
      let localStorage: Storage;
      localStorage = window.localStorage;

      if(localStorage.getItem('checkout'))
        this.state = JSON.parse(localStorage.getItem('checkout') || '{}');
      else
        this.state = {
          name: '',
          slug: '',
          tier: '',
          price: ''
        }
    }
  }

  onSubmit(): void{
    // stop here if form is invalid
    if (this.checkoutForm.invalid) {//show box msg
      this.invalidForm = true;
      //wait 3 Seconds and hide
      setTimeout(() => {
          this.invalidForm = false;
      }, 3000);
        return;
    }
    
    this.addClient();
  }

  addClient(){
    this.invalidForm = false;
    let client_data = this.checkoutForm.value;

    client_data.service = this.state.slug;
    client_data.tier = this.state.tier;
    
    this.checkout.addClient(client_data).subscribe((data) => {
      if(data.status_code == 200){
        this.submited = true;
        setTimeout(() => {
          this.submited = false;
        }, 5000);
          return;
      }else{
        this.invalidForm = true;
        setTimeout(() => {
          this.invalidForm = false;
        }, 3000);
          return;
      }
      }, (err) => {
        this.invalidForm = true;
        setTimeout(() => {
          this.invalidForm = false;
        }, 3000);
          return;
    });
  }
}
