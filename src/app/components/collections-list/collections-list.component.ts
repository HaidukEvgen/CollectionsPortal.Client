import { Component } from '@angular/core';
import { Collection } from '../../models/collection.model';
import { CollectionService } from '../../services/collection.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ExceptionHandler } from '../../helpers/exceptionHandler';

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
    private toast: NgToastService,
    private exceptionHandler: ExceptionHandler
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
        this.exceptionHandler.handleHttpError(
          error,
          '/collections',
          this.router,
          this.toast
        );
      }
    );
  }

  redirectToCollectionDetails(collectionId: number): void {
    this.router.navigate(['/collections', collectionId]);
  }

  redirectToNewCollectionPage() {
    this.router.navigate(['/new-collection']);
  }
}
