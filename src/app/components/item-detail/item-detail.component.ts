import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { Collection, Item } from '../../models/collection.model';
import { ExceptionHandler } from '../../helpers/exceptionHandler';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
})
export class ItemDetailComponent {
  collectionId!: number;
  itemId!: number;
  item!: Item;
  collection!: Collection;
  canEditItem!: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private toast: NgToastService,
    private exceptionHandler: ExceptionHandler,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectionId = +params['collectionId'];
      this.itemId = +params['itemId'];
      this.getCollection();
      this.getItem();
    });
  }

  private getCollection() {
    this.collectionService.getCollection(this.collectionId).subscribe(
      (data) => {
        this.collection = data;
        this.canEditItem =
          this.authService.isUserWithName(this.collection.creatorName) ||
          this.authService.isAdmin();
      },
      (error) => {
        this.exceptionHandler.handleHttpError(
          error,
          `/collections/${this.collectionId}`,
          this.router,
          this.toast
        );
      }
    );
  }

  getItem() {
    this.collectionService
      .getCollectionItem(this.collectionId, this.itemId)
      .subscribe(
        (data) => {
          this.item = data;
        },
        (error) => {
          this.exceptionHandler.handleHttpError(
            error,
            `/collections/${this.collectionId}`,
            this.router,
            this.toast
          );
        }
      );
  }

  shouldDisplayCustomField(name: string | null): boolean {
    return name !== null && name !== undefined;
  }

  deleteItem() {
    this.collectionService
      .deleteCollectionItem(this.collectionId, this.itemId)
      .subscribe(
        (data) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Item deleted successfully',
            duration: 3000,
          });
          this.router.navigate(['/collections', this.collectionId]);
        },
        (error) => {
          this.exceptionHandler.handleHttpError(
            error,
            `/collections/${this.collectionId}`,
            this.router,
            this.toast
          );
        }
      );
  }

  getFormattedTags(): string {
    return this.item.tags.map((tag) => tag.name).join(', ');
  }

  redirectToCollectionPage() {
    this.router.navigate(['/collections', this.collectionId]);
  }
}
