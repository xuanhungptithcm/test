import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainRoute } from './mainRoute.routing';
import { HomeComponent } from './main-content/home.component';
import { AuthenticationService } from './Shared/services/authentication.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContentComponent } from './main-content/content/content.component';
import { ListmusicComponent } from './main-content/content/listmusic/listmusic.component';
import { RegisterComponent } from './main-content/content/register/register.component';
import { DashboardComponent } from './main-content/content/dashboard/dashboard.component';
import { ManagerUserComponent } from './main-content/content/manager-user/manager-user.component';
import { PlayAudioComponent } from './main-content/content/listmusic/play-audio/play-audio.component';
import { FileService } from './Shared/services/file.service';
import { MenuComponent } from './main-content/content/menu/menu.component';

// QR code
import { QRCodeModule } from 'angular2-qrcode';
import { AudioService } from './Shared/services/audio.service';
import { FormatNameAudioPipe } from './pipes/format-name-audio.pipe';
import { SearchBehaviorService } from './Shared/services/searchBehavior.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// debug in Xampp
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// ng bootstrap
import {NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ManagerMusicComponent } from './main-content/content/manager-music/manager-music.component';
import { PlayListComponent } from './main-content/content/play-list/play-list.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ZoneDetailComponent } from './main-content/content/dashboard/zone-detail/zone-detail.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ContentComponent,
    ListmusicComponent,
    RegisterComponent,
    DashboardComponent,
    ManagerUserComponent,
    PlayAudioComponent,
    FormatNameAudioPipe,
    SafeUrlPipe,
    ManagerMusicComponent,
    PlayListComponent,
    ZoneDetailComponent,
  ],
  imports: [
    PerfectScrollbarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbTabsetModule.forRoot(),
    MainRoute,
    ReactiveFormsModule,
    QRCodeModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthenticationService, FileService, AudioService, SearchBehaviorService
  ,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
