import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'http://localhost:8080/services'; 

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.url)
      .pipe(
        retry(1),
        catchError(this.handleError))
  }

  getServiceBySlug(slug: string): Observable<Service> {
    return this.http.get<Service>(this.url + '/' + slug)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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