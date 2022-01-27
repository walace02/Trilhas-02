import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TrilhasComponent } from './list/trilhas.component';
import { TrilhasDetailComponent } from './detail/trilhas-detail.component';
import { TrilhasUpdateComponent } from './update/trilhas-update.component';
import { TrilhasDeleteDialogComponent } from './delete/trilhas-delete-dialog.component';
import { TrilhasRoutingModule } from './route/trilhas-routing.module';

@NgModule({
  imports: [SharedModule, TrilhasRoutingModule],
  declarations: [TrilhasComponent, TrilhasDetailComponent, TrilhasUpdateComponent, TrilhasDeleteDialogComponent],
  entryComponents: [TrilhasDeleteDialogComponent],
})
export class TrilhasModule {}
