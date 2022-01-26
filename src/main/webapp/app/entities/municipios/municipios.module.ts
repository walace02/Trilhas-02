import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MunicipiosComponent } from './list/municipios.component';
import { MunicipiosDetailComponent } from './detail/municipios-detail.component';
import { MunicipiosUpdateComponent } from './update/municipios-update.component';
import { MunicipiosDeleteDialogComponent } from './delete/municipios-delete-dialog.component';
import { MunicipiosRoutingModule } from './route/municipios-routing.module';

@NgModule({
  imports: [SharedModule, MunicipiosRoutingModule],
  declarations: [MunicipiosComponent, MunicipiosDetailComponent, MunicipiosUpdateComponent, MunicipiosDeleteDialogComponent],
  entryComponents: [MunicipiosDeleteDialogComponent],
})
export class MunicipiosModule {}
