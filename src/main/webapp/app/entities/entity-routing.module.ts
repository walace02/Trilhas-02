import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cadastro-trilha',
        data: { pageTitle: 'jhipsterSampleApplicationApp.cadastroTrilha.home.title' },
        loadChildren: () => import('./cadastro-trilha/cadastro-trilha.module').then(m => m.CadastroTrilhaModule),
      },
      {
        path: 'usuario',
        data: { pageTitle: 'jhipsterSampleApplicationApp.usuario.home.title' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'situacoes-trilha',
        data: { pageTitle: 'jhipsterSampleApplicationApp.situacoesTrilha.home.title' },
        loadChildren: () => import('./situacoes-trilha/situacoes-trilha.module').then(m => m.SituacoesTrilhaModule),
      },
      {
        path: 'pontos-venda',
        data: { pageTitle: 'jhipsterSampleApplicationApp.pontosVenda.home.title' },
        loadChildren: () => import('./pontos-venda/pontos-venda.module').then(m => m.PontosVendaModule),
      },
      {
        path: 'pontos-cardeais',
        data: { pageTitle: 'jhipsterSampleApplicationApp.pontosCardeais.home.title' },
        loadChildren: () => import('./pontos-cardeais/pontos-cardeais.module').then(m => m.PontosCardeaisModule),
      },
      {
        path: 'pontos-turisticos',
        data: { pageTitle: 'jhipsterSampleApplicationApp.pontosTuristicos.home.title' },
        loadChildren: () => import('./pontos-turisticos/pontos-turisticos.module').then(m => m.PontosTuristicosModule),
      },
      {
        path: 'fotografias',
        data: { pageTitle: 'jhipsterSampleApplicationApp.fotografias.home.title' },
        loadChildren: () => import('./fotografias/fotografias.module').then(m => m.FotografiasModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
