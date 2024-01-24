import { Component, ViewChild } from '@angular/core';
import { AppTableComponent } from './table/table.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { UserService } from '../../services/user.service';
import { TableUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [AppTableComponent, UserActionsComponent],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
})
export class UserManagerComponent {
  @ViewChild(AppTableComponent, { static: false })
  tableComponent!: AppTableComponent;
  mappedUsers: TableUser[] = [];
  username: string = '';
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.storageService.getUsername().subscribe((val) => {
      this.username = val || this.authService.getUsername();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.mappedUsers = data.map((user) => ({
          checked: false,
          ...user,
        }));
      },
      (error) => {
        this.handleRequestError(error);
      }
    );
  }

  setStatusToSelectedUsers(status: number) {
    const checkedUserIds = this.mappedUsers
      .filter((user) => user.checked)
      .map((user) => user.id);
    if (checkedUserIds.length === 0) return;
    this.userService.setStatuses(checkedUserIds, status).subscribe(
      () => {
        this.getUsers();
        this.tableComponent.allChecked = false;
      },
      (error) => {
        this.handleRequestError(error);
      }
    );
  }

  deleteSelected() {
    const checkedUserIds = this.mappedUsers
      .filter((user) => user.checked)
      .map((user) => user.id);
    if (checkedUserIds.length === 0) return;
    this.userService.deleteUsers(checkedUserIds).subscribe(
      () => {
        this.getUsers();
        this.tableComponent.allChecked = false;
      },
      (error) => {
        this.handleRequestError(error);
      }
    );
  }

  private handleRequestError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.toast.error({
          detail: 'Error',
          summary: 'Failed to connect to the API',
          duration: 3000,
        });
      } else {
        this.toast.error({
          detail: 'Error',
          summary: error.error,
          duration: 3000,
        });
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  setAll(checked: boolean) {
    this.mappedUsers.forEach((user) => (user.checked = checked));
    this.tableComponent.allChecked = checked;
  }

  setOne(props: { id: string; event: boolean }) {
    const targetUser = this.mappedUsers.find((user) => user.id == props.id);
    if (targetUser) {
      targetUser.checked = props.event;
    }
  }
}
