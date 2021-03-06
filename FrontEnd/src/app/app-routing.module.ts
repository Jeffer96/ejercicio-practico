import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users-list' },
  { path: 'users-list', component: UserListComponent },
  { path: 'create-user', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent },
  { path: 'edit-user/:id/:mode', component: UserFormComponent },
  { path: 'users-list/:page/:lxp', component: UserListComponent },
  { path: 'users-list/:page/:lxp/:pi', component: UserListComponent },
  { path: 'users-list/:fn/:filter', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
