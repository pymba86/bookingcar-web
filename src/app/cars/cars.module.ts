import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CarsComponent } from './cars.component';
import { CarsRoutes } from './cars.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(CarsRoutes), NgxChartsModule],
  declarations: [CarsComponent]
})

export class CarsModule {}
