import { Component, Input } from '@angular/core';
import { Collection } from '../../models/collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.css',
})
export class CollectionDetailComponent {
  collectionId!: number;
  @Input() collection!: Collection;
  displayedColumns: string[] = ['id', 'name', 'tags'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectionId = +params['id'];
      this.collectionService.getCollection(this.collectionId).subscribe(
        (data) => {
          this.collection = data;
        },
        (error) => {
          this.handleError(error);
        }
      );
    });
  }

  redirectToItemPage(collectionId: number, itemId: number): void {
    this.router.navigate(['/collections', collectionId, 'items', itemId]);
  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 0:
          this.showNotification('Failed to connect to the API');
          break;
        default:
          this.showNotification(err.statusText + " error: " + err.error.Message);
          this.router.navigate(['/collections']);
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
