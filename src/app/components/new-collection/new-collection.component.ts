import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';
import { Router } from '@angular/router';
import { ExceptionHandler } from '../../helpers/exceptionHandler';
import { NgToastService } from 'ng-angular-popup';
import { Category, NewCollection } from '../../models/collection.model';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrl: './new-collection.component.css',
})
export class NewCollectionComponent {
  newCollectionForm: FormGroup;
  categories!: Category[];
  constructor(
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private router: Router,
    private exceptionHandler: ExceptionHandler,
    private toast: NgToastService
  ) {
    this.newCollectionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      categoryId: [null, Validators.required],
      customString1Name: [null],
      customString2Name: [null],
      customString3Name: [null],
      customInt1Name: [null],
      customInt2Name: [null],
      customInt3Name: [null],
      customText1Name: [null],
      customText2Name: [null],
      customText3Name: [null],
      customBool1Name: [null],
      customBool2Name: [null],
      customBool3Name: [null],
      customDate1Name: [null],
      customDate2Name: [null],
      customDate3Name: [null],
    });
  }

  ngOnInit(): void {
    this.collectionService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
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

  onFileChange(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isImageFile(file!)) {
      this.newCollectionForm.patchValue({
        image: file,
      });
      this.newCollectionForm.get('image')!.updateValueAndValidity();
    } else {
      fileInput.value = '';
      this.toast.error({
        detail: 'Bad file',
        summary: 'File must be an image',
        duration: 3000,
      });
    }
  }

  onSubmit() {
    if (this.newCollectionForm.valid) {
      const formData = new FormData();
      const formValue = this.newCollectionForm.value as NewCollection;
      if (this.isImageFile(formValue.image)) {
        Object.keys(formValue).forEach((key) => {
          if (this.newCollectionForm.get(key)!.value != null) {
            formData.append(key, this.newCollectionForm.get(key)!.value);
          }
        });

        this.collectionService.createCollection(formData).subscribe(
          (response) => {
            this.toast.success({
              detail: 'Success',
              summary: 'Collection created successfully',
              duration: 3000,
            });
            this.router.navigate(['/collections']);
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
          detail: 'Bad file',
          summary: 'File must be an image',
          duration: 3000,
        });
      }
    } else {
      this.toast.error({
        detail: 'Form is invalid',
        summary: 'Fill all required fields',
        duration: 3000,
      });
    }
  }

  isImageFile(file: File): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileNameParts = file.name.split('.');
    const extension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    return allowedExtensions.includes(extension);
  }
}
