import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { JobsComponent } from './jobs/jobs.component';
import { DiscussComponent } from './discuss/discuss.component';

const routes: Routes = [
  { path: 'index', component: LandingComponent },
  { path: 'main', component: JobsComponent },
  { path: 'discuss', component: DiscussComponent },
  { path: '', pathMatch: 'full', redirectTo: '/index' }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }