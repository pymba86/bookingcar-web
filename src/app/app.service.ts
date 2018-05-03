import {Injectable} from '@angular/core';
import {UiService} from '@tabler/angular-ui';

const sourceCode = {
  label: 'Source Code',
  labelClass: 'd-none d-lg-inline',
  link: '',
  linkClass: 'btn btn-sm btn-outline-primary ml-2',
  icon: 'fa fa-fw fa-github',
  external: true,
};
const documentation = {
  label: 'Documentation',
  labelClass: 'd-none d-lg-inline',
  link: '/',
  linkClass: 'btn btn-sm btn-outline-success ml-2',
  icon: 'fa fa-fw fa-info',
  external: true,
};
const fire = {
  label: 'Firebase Demo',
  labelClass: 'd-none d-lg-inline',
  link: 'https://tabler-angular-fire.firebaseapp.com/',
  linkClass: 'btn btn-sm btn-outline-warning ml-2',
  icon: 'fa fa-fw fa-fire',
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
      },
      {
        label: 'Станции',
        icon: 'fe fe-home',
        link: '/stations',
      },
      {
        label: 'Услуги',
        icon: 'fe fe-home',
        link: '/services',
      }

    ];
    this.ui.headerSubNav = [fire, documentation, sourceCode];


    const now = new Date().getTime();

    this.ui.footerSubNav = [[documentation], [sourceCode], [fire]];
    this.ui.footerSubText = `Premium and Open Source dashboard template with responsive and high quality UI. For Free!`;

    this.ui.footerNav = [documentation, sourceCode];
    this.ui.footerText = `
      Copyright © 2018 <a [href]="https://github.com/tabler/tabler-angular">tabler-angular</a>. 
      Theme by <a href="https://github.com/codecalm" target="_blank">@codecalm</a>. 
      Angular by <a href="https://github.com/beeman" target="_blank">@beeman</a>.
      MIT Licensed`;
  }
}
