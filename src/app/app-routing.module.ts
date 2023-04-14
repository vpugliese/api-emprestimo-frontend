import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientRegisterUpdateComponent } from './pages/client-register-update/client-register-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'clientes/cadastrar', component: ClientRegisterUpdateComponent },
  { path: 'clientes/atualizar/:cpf', component: ClientRegisterUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
