import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';


const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
  },
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: 'contacts', component: ContactListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
