import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { Collection, Item } from '../../models/collection.model';
import { ExceptionHandler } from '../../helpers/exceptionHandler';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  // itemForm = this.formBuilder.group({
  //   customString1Value: new FormControl(''),
  //   customString2Value: new FormControl(''),
  //   customString3Value: new FormControl(''),
  //   customInt1Value: new FormControl(''),
  //   customInt2Value: new FormControl(''),
  //   customInt3Value: new FormControl(''),
  //   customText1Name: new FormControl(''),
  //   customText2Name: new FormControl(''),
  //   customText3Name: new FormControl(''),
  //   customBool1Name: new FormControl(''),
  //   customBool2Name: new FormControl(''),
  //   customBool3Name: new FormControl(''),
  //   customDate1Name: new FormControl(''),
  //   customDate2Name: new FormControl(''),
  //   customDate3Name: new FormControl(''),
  // });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private toast: NgToastService,
    private exceptionHandler: ExceptionHandler,
    private authService: AuthService,
    private formBuilder: FormBuilder
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
    this.collectionService.deleteCollectionItem(this.collectionId, this.itemId).subscribe(
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
}
