import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { Collection, NewItem, Tag } from '../../models/collection.model';
import { ExceptionHandler } from '../../helpers/exceptionHandler';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
})
export class NewItemComponent {
  collectionId!: number;
  item!: NewItem;
  collection!: Collection;
  canEditItem!: boolean;
  newItemForm = this.formBuilder.group({
    name: ['', Validators.required],
    tags: [''],
    customString1Value: [null],
    customString2Value: [null],
    customString3Value: [null],
    customInt1Value: [null],
    customInt2Value: [null],
    customInt3Value: [null],
    customText1Value: [null],
    customText2Value: [null],
    customText3Value: [null],
    customBool1Value: [null],
    customBool2Value: [null],
    customBool3Value: [null],
    customDate1Value: [null],
    customDate2Value: [null],
    customDate3Value: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private toast: NgToastService,
    private exceptionHandler: ExceptionHandler,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectionId = +params['id'];
      this.getCollection();
    });
  }

  private getCollection() {
    this.collectionService.getCollection(this.collectionId).subscribe(
      (data) => {
        this.collection = data;
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

  onSubmit() {
    if (this.newItemForm.valid) {
      const formValue = this.newItemForm.value;

      const tags: Tag[] = formValue
        .tags!.split(' ')
        .map((tagName: string) => ({ name: tagName.trim() }));

      const newItem: NewItem = {
        name: formValue.name!,
        tags: tags,
        customString1Value: formValue.customString1Value!,
        customString2Value: formValue.customString2Value!,
        customString3Value: formValue.customString3Value!,
        customInt1Value: formValue.customInt1Value!,
        customInt2Value: formValue.customInt2Value!,
        customInt3Value: formValue.customInt3Value!,
        customText1Value: formValue.customText1Value!,
        customText2Value: formValue.customText2Value!,
        customText3Value: formValue.customText3Value!,
        customBool1Value: formValue.customBool1Value!,
        customBool2Value: formValue.customBool2Value!,
        customBool3Value: formValue.customBool3Value!,
        customDate1Value: formValue.customDate1Value!,
        customDate2Value: formValue.customDate2Value!,
        customDate3Value: formValue.customDate3Value!,
      };

      this.collectionService
        .addCollectionItem(this.collectionId, newItem)
        .subscribe(
          (response) => {
            this.toast.success({
              detail: 'Success',
              summary: 'Item created successfully',
              duration: 3000,
            });
            this.router.navigate(['/collections', this.collectionId]);
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
    } else {
      this.toast.error({
        detail: 'Form is invalid',
        summary: 'Fill all required fields',
        duration: 3000,
      });
    }
  }

  shouldDisplayCustomField(name: string | null): boolean {
    return name !== null && name !== undefined;
  }
}
