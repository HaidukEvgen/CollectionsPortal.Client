import { Component, ViewChild } from '@angular/core';
import { AppTableComponent } from './table/table.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { UserService } from '../../services/user.service';
import { TableUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ExceptionHandler } from '../../helpers/exceptionHandler';
import { Router } from '@angular/router';

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
  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private router: Router,
    private exceptionHandler: ExceptionHandler
  ) {}

  ngOnInit() {
    this.getUsers();
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
        this.exceptionHandler.handleHttpError(
          error,
          '',
          this.router,
          this.toast
        );
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
        this.exceptionHandler.handleHttpError(
          error,
          '',
          this.router,
          this.toast
        );
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
        this.exceptionHandler.handleHttpError(
          error,
          '',
          this.router,
          this.toast
        );
      }
    );
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
