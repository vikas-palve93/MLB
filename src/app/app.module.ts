import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { MatchesComponent } from './Component/Matches/matches.component';
import { ScoreboardComponent } from './Component/Scoreboard/scoreboard.component';
import { NavbarComponent } from './Component/Navbar/navbar.component';
import { DataService } from './Services/data.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { A2HSDialogComponent } from './Templates/a2-hs-dialog/a2-hs-dialog.component';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: 'matches', component: MatchesComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: '**', component:  MatchesComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    ScoreboardComponent,
    NavbarComponent,
    A2HSDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularWebStorageModule,
    ModalModule.forRoot(),
    NgDatepickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DataService,
    DeviceDetectorService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
