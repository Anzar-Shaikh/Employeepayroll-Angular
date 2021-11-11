import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from "../model/employee";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class Service {
  private mainUrl: string = "http://localhost:8080/employeePayroll"

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Purpose: this methos is used to request the GET http method.
   * it fetch the employee data form the database.
   *
   * @returns the repsonse message of the GET method
   */
  getEmployeeData(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${environment.apiURL}`);
  }

  /**
   * Purpse: This method is used to POST request method to hit the HTTP server.
   * @param employee :- employee details wil stored into the database.
   * @returns Post request response message.
   */

  addEmployeeData(employee: any): Observable<any> {
    return this.httpClient.post(`${this.mainUrl}/create`, employee);

  }

  /**
   * Purpose : DELETE request method to hit the HTTP server.
   * @param id employee_id for which the delete action needs to be taken.
   * @returns the delete request response.
   */
  deleteEmployeeData(id:number): Observable<any> {
    return this.httpClient.delete(`${this.mainUrl}/delete/${id}`);
  }

  getEmployee(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/employeepayroll/employee/${id}`);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.httpClient.put(`http://localhost:8080/employeepayroll/update/${id}`, value);
  }

}
