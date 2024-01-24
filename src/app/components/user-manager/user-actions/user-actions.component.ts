import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.css',
})
export class UserActionsComponent {
  @Output() blockEvent = new EventEmitter();
  @Output() unblockEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  onBlock() {
    this.blockEvent.emit();
  }

  onUnblock() {
    this.unblockEvent.emit();
  }

  onDelete() {
    this.deleteEvent.emit();
  }
}
