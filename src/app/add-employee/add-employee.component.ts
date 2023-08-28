import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  newEmployee = { name: '', position: '' };

  constructor(private employeeService: EmployeeService) {}

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe(
      (response) => {
        console.log('Employee added successfully', response);
        // Clear the form fields after adding an employee
        this.newEmployee = { name: '', position: '' };
      },
      (error) => {
        console.error('Error adding employee', error);
      }
    );
  }
}
