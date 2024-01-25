import { Component } from '@angular/core';
import { Collection } from '../../models/collection.model';
import { CollectionService } from '../../services/collection.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.css',
})
export class CollectionsListComponent {
  collections!: Collection[];

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collectionService.getCollections().subscribe(
      (data) => {
        this.collections = data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  redirectToCollectionDetails(collectionId: number): void {
    this.router.navigate(['/collections', collectionId]);
  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 0:
          this.showNotification('Failed to connect to the API');
          break;
        default:
          this.showNotification(
            err.statusText + ' error: ' + err.error.Message
          );
          break;
      }
    } else {
      this.showNotification('An unexpected error occurred');
    }
  }

  private showNotification(message: string): void {
    this.toast.error({
      detail: 'Error',
      summary: message,
      duration: 3000,
    });
  }
}
