import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
  { path: 'view-employees', component: ViewEmployeesComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
