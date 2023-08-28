import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'view-employees', component: ViewEmployeesComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
