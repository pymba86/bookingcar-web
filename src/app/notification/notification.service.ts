import {Notification} from './notification.model';
/**
 * A service to create notification, It can be used from any component or guard
 */
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

  notification: Notification;
  event = new EventEmitter<Notification>();


  constructor( ) {
  }

  set(notification: Notification) {
    this.event.emit(notification);
    this.notification = notification;
  }

  get(): Notification {
    const message = this.notification;
    this.notification = null;
    return message;
  }

  success(msg: string) {
    this.set({type: 'success', text: msg});
  }

  error(msg: string) {
    this.set({type: 'danger', text: msg});
  }

  warning(msg: string) {
    this.set({type: 'warning', text: msg});
  }

  info(msg: string) {
    this.set({type: 'primary', text: msg});
  }
}
