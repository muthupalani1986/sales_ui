import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotificationComponent } from './notification/notification.component';
import { NewQueryComponent } from './new-query/new-query.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticateGuard } from './shared/guards/authenticate.guard';
import { HttpCallsInterceptor } from './shared/interceptors/http-calls.interceptors';
import { LogoutComponent } from './logout/logout.component';
import { UploadPickupComponent } from './upload-pickup/upload-pickup.component';
import { MatRadioModule } from '@angular/material/radio';

const appRoutes: Routes = [
  {
    path: 'upload-settlement', component: UploadComponent, canActivate: [AuthenticateGuard]
  },
  {
    path: 'upload-pickups', component: UploadPickupComponent, canActivate: [AuthenticateGuard]
  },
  {
    path: 'logout', component: LogoutComponent, canActivate: [AuthenticateGuard]
  },
  { path: 'view', component: ListComponent },
  { path: 'newQuery', component: NewQueryComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ListComponent,
    SpinnerComponent,
    NotificationComponent,
    NewQueryComponent,
    LoginComponent,
    LogoutComponent,
    UploadPickupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallsInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
