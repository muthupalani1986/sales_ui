import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotificationComponent } from './notification/notification.component';

const appRoutes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'view',      component: ListComponent },
  { path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ListComponent,
    SpinnerComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
