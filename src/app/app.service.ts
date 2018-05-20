import {Injectable} from '@angular/core';
import {UiService} from '@tabler/angular-ui';
import {ProfileService} from './profiles/services/profile.service';
import {ProfileInfo} from './profiles/models/profile-info.model';

const sourceCode = {
  label: 'Исходный код',
  labelClass: 'd-none d-lg-inline',
  link: 'https://bitbucket.org/PyMba86/bx',
  linkClass: 'btn btn-sm btn-outline-primary ml-2',
  icon: 'fa fa-fw fa-bitbucket',
  external: true,
};

const profile = {
  label: 'mysql',
  labelClass: 'd-none d-lg-inline',
  link: 'https://bitbucket.org/PyMba86/bx',
  linkClass: 'btn btn-sm btn-warning ml-2',
  icon: 'fa fa-fw fa-bitbucket',
  external: true,
};

@Injectable()
export class AppService {


  constructor(private ui: UiService,
              private profileService: ProfileService) {
    this.init();
  }

  public init() {
    this.ui.appLogo = '';
    this.ui.appName = 'Аренда автомобилей';
    this.ui.headerNav = [
      {
        label: 'Автомобиль',
        icon: 'fe fe-home',
        link: '/cars',
      },
      {
        label: 'Станция',
        icon: 'fe fe-home',
        link: '/location',
      },
      {
        label: 'Категория',
        icon: 'fe fe-home',
        link: '/cars-category',
      },
      {
        label: 'Топливо',
        icon: 'fe fe-home',
        link: '/cars-fuel',
      },
      {
        label: 'Коробка передач',
        icon: 'fe fe-home',
        link: '/cars-gearbox',
      },
      {
        label: 'Привод',
        icon: 'fe fe-home',
        link: '/cars-actuator',
      }
    ];

    this.profileService.getProfileInfo().then((profileInfo) => {
      this.ui.headerSubNav = [{
        label: profileInfo.activeProfiles[0],
        labelClass: 'd-none d-lg-inline',
        link: 'https://bitbucket.org/PyMba86/bx-spring',
        linkClass: 'btn btn-sm btn-outline-warning ml-2',
        external: true,
      }, sourceCode];
    });

    this.ui.headerSubNav = [sourceCode];
    const now = new Date().getTime();

    this.ui.footerSubText = `Эксплуатация и администрирование баз данных`;

    this.ui.footerText = `
      Copyright © 2018 <a [href]="https://github.com/tabler/tabler-angular">tabler-angular</a>`;
  }
}
