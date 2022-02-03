import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TrilhaComponent } from './list/trilha.component';
import { TrilhaDetailComponent } from './detail/trilha-detail.component';
import { TrilhaUpdateComponent } from './update/trilha-update.component';
import { TrilhaDeleteDialogComponent } from './delete/trilha-delete-dialog.component';
import { TrilhaRoutingModule } from './route/trilha-routing.module';

@NgModule({
  imports: [SharedModule, TrilhaRoutingModule],
  declarations: [TrilhaComponent, TrilhaDetailComponent, TrilhaUpdateComponent, TrilhaDeleteDialogComponent],
  entryComponents: [TrilhaDeleteDialogComponent],
})
export class TrilhaModule {}
