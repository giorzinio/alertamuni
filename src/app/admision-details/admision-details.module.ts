import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdmisionDetailsPage } from './admision-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdmisionDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdmisionDetailsPage]
})
export class AdmisionDetailsPageModule {}
