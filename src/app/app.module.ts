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
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { MatTableModule } from '@angular/material/table';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';
import { AdminGuard } from './guards/admin.guard';
import { NewItemComponent } from './components/new-item/new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    CollectionsListComponent,
    CollectionDetailComponent,
    ItemDetailComponent,
    NewCollectionComponent,
    NewItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    NgToastModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    [AuthGuard],
    [AdminGuard],
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
