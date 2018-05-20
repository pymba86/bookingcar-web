import {Injectable} from '@angular/core';
import {UiService} from '@tabler/angular-ui';

const sourceCode = {
  label: 'Source Code',
  labelClass: 'd-none d-lg-inline',
  link: 'https://bitbucket.org/PyMba86/bx',
  linkClass: 'btn btn-sm btn-outline-primary ml-2',
  icon: 'fa fa-fw fa-bitbucket',
  external: true,
};

@Injectable()
export class AppService {
  constructor(private ui: UiService) {
    this.init();
  }

  public init() {
    this.ui.appLogo = '';
    this.ui.appName = 'Аренда автомобилей';
    this.ui.headerNav = [
      {
        label: 'Автомобили',
        icon: 'fe fe-home',
        link: '/cars',
      }
    ];

    this.ui.headerSubNav = [sourceCode];
    const now = new Date().getTime();

    this.ui.footerSubText = `Эксплуатация и администрирование баз данных`;

    this.ui.footerText = `
      Copyright © 2018 <a [href]="https://github.com/tabler/tabler-angular">tabler-angular</a>`;
  }
}
