import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService) {}

  showTopLeft() {
    this.messageService.add({
      key: 'tl',
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
    });
  }
  showError() {
    this.messageService.add({
      key: 'tl',
      severity: 'warn',
      summary: 'Info',
      detail: 'This is an error',
    });
  }

  showTopCenter() {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Info',
      detail: 'Message Content',
    });
  }

  showBottomCenter() {
    this.messageService.add({
      key: 'bc',
      severity: 'warn',
      summary: 'Info',
      detail: 'Message Content',
    });
  }
}
