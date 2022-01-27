import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CadastroTrilhaComponent } from './list/cadastro-trilha.component';
import { CadastroTrilhaDetailComponent } from './detail/cadastro-trilha-detail.component';
import { CadastroTrilhaUpdateComponent } from './update/cadastro-trilha-update.component';
import { CadastroTrilhaDeleteDialogComponent } from './delete/cadastro-trilha-delete-dialog.component';
import { CadastroTrilhaRoutingModule } from './route/cadastro-trilha-routing.module';

@NgModule({
  imports: [SharedModule, CadastroTrilhaRoutingModule],
  declarations: [
    CadastroTrilhaComponent,
    CadastroTrilhaDetailComponent,
    CadastroTrilhaUpdateComponent,
    CadastroTrilhaDeleteDialogComponent,
  ],
  entryComponents: [CadastroTrilhaDeleteDialogComponent],
})
export class CadastroTrilhaModule {}
