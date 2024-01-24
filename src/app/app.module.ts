import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule, DatePipe } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    NgToastModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    [AuthGuard],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
