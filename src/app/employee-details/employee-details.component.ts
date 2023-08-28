import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent {
  employeeId!: number;
  employee: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = Number(params.get('id'));
      this.getEmployeeDetails(this.employeeId);
    });
  }

  getEmployeeDetails(id: number): void {
    this.employeeService.getEmployee(id).subscribe(
      (employee) => {
        this.employee = employee;
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        (response) => {
          console.log('Employee deleted successfully', response);
          // Navigate back to the view employees page after deletion
          this.router.navigate(['/dashboard/employees']);
        },
        (error) => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }
}
