import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  employeeId: number = 0;
  updatedEmployee: any = {
    first_name: '',
    last_name: '',
    email: '',
  };
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
        this.updatedEmployee = {
          first_name: '',
          last_name: '',
          email: '',
        };
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  updateEmployee(): void {
    this.employeeService
      .updateEmployee(this.employeeId, this.updatedEmployee)
      .subscribe(
        (response) => {
          console.log('Employee updated successfully', response);
          // Navigate back to the employee details page after update
          this.router.navigate(['/employee-details', this.employeeId]);
        },
        (error) => {
          console.error('Error updating employee', error);
        }
      );
  }
}
