import { Component } from '@angular/core';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  clients: IClient[] = [];
  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.showAllClients();
  }

  showAllClients() {
    this.clientsService.listAllClients().subscribe((result: IClient[]) => {
      this.clients = result;
    });
  }

  deleteClient(cpf: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Isso não é reversível.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientsService.deleteClientByCpf(cpf).subscribe(() => {
          Swal.fire('Deletado!', 'O cliente foi deletado.', 'success');
          this.ngOnInit();
        });
      }
    });
  }
}
