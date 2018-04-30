import {NgModule} from '@angular/core';

import {AlertModule} from './alert';

export {AlertModule} from './alert/alert.module';

import {AvatarModule} from './avatar';

export {AvatarModule} from './avatar/avatar.module';

import {BadgeModule} from './badge';

export {BadgeModule} from './badge/badge.module';

import {ButtonModule} from './button';

export {ButtonModule} from './button/button.module';

import {CardModule} from './card';

export {CardModule} from './card/card.module';

import {FooterModule} from './footer';

export {FooterModule} from './footer/footer.module';

import {HeaderModule} from './header';

export {HeaderModule} from './header/header.module';

import {LayoutModule} from './layout';

export {LayoutModule} from './layout/layout.module';

import {LinkModule} from './link';

export {LinkModule} from './link/link.module';

import {PageModule} from './page';

export {PageModule} from './page/page.module';

const uiModules = [
  AlertModule,
  AvatarModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FooterModule,
  HeaderModule,
  LayoutModule,
  LinkModule,
  PageModule,
];

@NgModule({
  imports: [...uiModules],
  exports: [...uiModules],
})
export class ModulesModule {
}
