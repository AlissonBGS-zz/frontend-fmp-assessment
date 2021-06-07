import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url = 'http://localhost:8080/clients/create'; 
  formData = new FormData();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/text', 'Accept': 'application/text'})
  }

  addClient (client: any): Observable<any> {
    return this.http.post<any>(this.url , client, this.httpOptions);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Server error: ${error.status}, ` + `Message: ${error.message}`;
    }
    return throwError(errorMessage);
  };

}