import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { Item } from '../../models/collection.model';
import { ExceptionHandler } from '../../helpers/exceptionHandler';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
})
export class ItemDetailComponent {
  collectionId!: number;
  itemId!: number;
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private toast: NgToastService,
    private exceptionHandler: ExceptionHandler
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectionId = +params['collectionId'];
      this.itemId = +params['itemId'];
    });
    this.getItem();
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
            '/collections',
            this.router,
            this.toast
          );
        }
      );
  }
}
