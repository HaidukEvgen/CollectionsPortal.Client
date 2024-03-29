import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { NewCollectionComponent } from './components/new-collection/new-collection.component';
import { AdminGuard } from './guards/admin.guard';
import { NewItemComponent } from './components/new-item/new-item.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'adminpanel',
    component: UserManagerComponent,
    canActivate: [AdminGuard],
  },
  { path: 'collections', component: CollectionsListComponent },
  { path: 'collections/:id', component: CollectionDetailComponent },
  {
    path: 'collections/:collectionId/items/:itemId',
    component: ItemDetailComponent,
  },
  {
    path: 'new-collection',
    component: NewCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'collections/:id/new-item',
    component: NewItemComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
