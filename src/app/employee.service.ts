import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employee);
  }

  getEmployee(id: number): Observable<any> {
    const url = `${this.apiUrl}/employees/${id}`;
    return this.http.get(url);
  }

  deleteEmployee(id: number): Observable<any> {
    const url = `${this.apiUrl}/employees/${id}`;
    return this.http.delete(url);
  }

  updateEmployee(id: number, updatedEmployee: any): Observable<any> {
    const url = `${this.apiUrl}/employees/${id}`;
    return this.http.put(url, updatedEmployee);
  }
}
