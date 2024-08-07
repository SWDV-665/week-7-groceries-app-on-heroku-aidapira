import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { GroceryModel } from './grocery.model';

interface Item {
  // Define the structure of your item here
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: Item[] = []

  baseURL = 'http://localhost:8080'

  constructor(public http: HttpClient) { }

  getItems(): Observable<GroceryModel[]> {
    return this.http.get<GroceryModel[]>(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: GroceryModel[]): GroceryModel[] {
    return res || [];
  }

  private handleError(error: HttpErrorResponse | any): Observable<never> {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      const err = error.message || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return throwError(errMsg);
  }
 
  removeItem(id: string) {
    let url = this.baseURL + '/api/groceries/' + id;
    return this.http.delete(url)
  }

  addItem(item: GroceryModel) : Observable<GroceryModel> {
    let url = this.baseURL + '/api/groceries';
    return this.http.post<GroceryModel>(url, item)
  }

  editItem(item: GroceryModel) {
    let url = this.baseURL + '/api/groceries/' + item._id;
    return this.http.put<GroceryModel>(url, item)
  }
}
