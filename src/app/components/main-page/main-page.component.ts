import { Component, Input } from '@angular/core';
import { Collection, ItemGeneralinfo } from '../../models/collection.model';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { ExceptionHandler } from '../../helpers/exceptionHandler';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  @Input() latestItems!: ItemGeneralinfo[];
  collections!: Collection[];
  displayedColumns: string[] = ['name', 'collectionName', 'creatorName'];

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private toast: NgToastService,
    private exceptionHandler: ExceptionHandler
  ) {}

  ngOnInit() {
    this.getLatestItems();
    this.loadCollections();
  }

  private getLatestItems() {
    this.collectionService.getLatestItems().subscribe(
      (data) => {
        this.latestItems = data;
      },
      (error) => {
        this.exceptionHandler.handleHttpError(
          error,
          '',
          this.router,
          this.toast
        );
      }
    );
  }

  loadCollections() {
    this.collectionService.getCollections().subscribe(
      (data) => {
        this.collections = data;
      },
      (error) => {
        this.exceptionHandler.handleHttpError(
          error,
          '/collections',
          this.router,
          this.toast
        );
      }
    );
  }

  redirectToItemPage(collectionId: number, itemId: number) {
    this.router.navigate(['/collections', collectionId, 'items', itemId]);
  }

  redirectToCollectionDetails(collectionId: number): void {
    this.router.navigate(['/collections', collectionId]);
  }
}
