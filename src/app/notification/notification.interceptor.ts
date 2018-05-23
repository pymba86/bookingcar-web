import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {NotificationService} from './notification.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const arr = event.headers.keys();
        console.log(arr);
        let alert = null;
        let isError = false;
        arr.forEach((entry) => {

          if (entry.endsWith('alert')) {
            alert = event.headers.get(entry);
            isError = false;
          } else if (entry.endsWith('error')) {
            alert = event.headers.get(entry);
            isError = true;
          }
        });
        if (alert) {
          console.log(alert);
          if (typeof alert === 'string') {
            if (this.notificationService) {
              if (isError) {
                this.notificationService.error(alert);
              } else {
                this.notificationService.success(alert);
              }
            }
          }
        }
      }
    }, (err: any) => {
    });
  }
}
