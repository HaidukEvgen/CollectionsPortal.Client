import { Component, Input } from '@angular/core';
import { Collection } from '../../models/collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { NgToastService } from 'ng-angular-popup';
import { ExceptionHandler } from '../../helpers/exceptionHandler';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.css',
})
export class CollectionDetailComponent {
  collectionId!: number;
  @Input() collection!: Collection;
  displayedColumns: string[] = ['id', 'name', 'tags'];
  canEditCollection!: boolean;

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
      this.collectionId = +params['id'];
      this.getCollection();
    });
  }

  private getCollection() {
    this.collectionService.getCollection(this.collectionId).subscribe(
      (data) => {
        this.collection = data;
        this.canEditCollection =
          this.authService.isUserWithName(this.collection.creatorName) ||
          this.authService.isAdmin();
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

  redirectToItemPage(collectionId: number, itemId: number): void {
    this.router.navigate(['/collections', collectionId, 'items', itemId]);
  }

  redirectToNewItemPage() {
    this.router.navigate(['/collections', this.collectionId, 'new-item']);
  }
  
}
