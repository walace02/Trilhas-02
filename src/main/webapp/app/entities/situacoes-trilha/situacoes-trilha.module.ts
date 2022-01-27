import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SituacoesTrilhaComponent } from './list/situacoes-trilha.component';
import { SituacoesTrilhaDetailComponent } from './detail/situacoes-trilha-detail.component';
import { SituacoesTrilhaUpdateComponent } from './update/situacoes-trilha-update.component';
import { SituacoesTrilhaDeleteDialogComponent } from './delete/situacoes-trilha-delete-dialog.component';
import { SituacoesTrilhaRoutingModule } from './route/situacoes-trilha-routing.module';

@NgModule({
  imports: [SharedModule, SituacoesTrilhaRoutingModule],
  declarations: [
    SituacoesTrilhaComponent,
    SituacoesTrilhaDetailComponent,
    SituacoesTrilhaUpdateComponent,
    SituacoesTrilhaDeleteDialogComponent,
  ],
  entryComponents: [SituacoesTrilhaDeleteDialogComponent],
})
export class SituacoesTrilhaModule {}
