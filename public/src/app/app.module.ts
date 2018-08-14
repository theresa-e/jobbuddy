import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HttpService } from './http.service';
import { JobsComponent } from './jobs/jobs.component';
import { DiscussComponent } from './discuss/discuss.component';
import { StudygroupsComponent } from './studygroups/studygroups.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    JobsComponent,
    DiscussComponent,
    StudygroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }
