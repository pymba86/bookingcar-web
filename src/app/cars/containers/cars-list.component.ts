import {Component} from '@angular/core';

@Component({
  selector: 'app-cars-list',
  template: `
    <ui-page>
      <router-outlet></router-outlet>
    </ui-page>
  `,
})
export class CarsListComponent {
}
