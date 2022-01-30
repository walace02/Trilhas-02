import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FotografiasComponent } from './list/fotografias.component';
import { FotografiasDetailComponent } from './detail/fotografias-detail.component';
import { FotografiasUpdateComponent } from './update/fotografias-update.component';
import { FotografiasDeleteDialogComponent } from './delete/fotografias-delete-dialog.component';
import { FotografiasRoutingModule } from './route/fotografias-routing.module';

@NgModule({
  imports: [SharedModule, FotografiasRoutingModule],
  declarations: [FotografiasComponent, FotografiasDetailComponent, FotografiasUpdateComponent, FotografiasDeleteDialogComponent],
  entryComponents: [FotografiasDeleteDialogComponent],
})
export class FotografiasModule {}
