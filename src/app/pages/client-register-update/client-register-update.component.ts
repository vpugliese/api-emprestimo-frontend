import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-register-update',
  templateUrl: './client-register-update.component.html',
  styleUrls: ['./client-register-update.component.css'],
})
export class ClientRegisterUpdateComponent {
  registerForm = new FormGroup({
    cpf: new FormControl(),
    nome: new FormControl(),
    telefone: new FormControl(),
    rua: new FormControl(),
    complemento: new FormControl(),
    cep: new FormControl(),
    rendimentoMensal: new FormControl(),
  });

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute
  ) {}

  clientCpf = 0;

  ngOnInit() {
    this.clientCpf = Number(this.route.snapshot.paramMap.get('cpf'));
    if (this.clientCpf) {
      this.clientsService
        .findClientByCpf(this.clientCpf)
        .subscribe((client: IClient) => {
          this.registerForm.setValue({
            cpf: client.cpf,
            nome: client.nome,
            telefone: client.telefone,
            rua: client.rua,
            complemento: client.complemento,
            cep: client.cep,
            rendimentoMensal: client.rendimentoMensal,
          });
        });
    }
  }

  onSubmit() {
    if (this.clientCpf) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    const client: IClient = this.registerForm.value as IClient;
    this.clientsService.registerClient(client).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
        }).then(() => {
          window.open('http://localhost:4200/clientes', '_self');
        });
      },
      (error) => {
        console.error();
      }
    );
  }

  atualizar() {
    const client: IClient = this.registerForm.value as IClient;
    this.clientsService.updateClient(client, this.clientCpf).subscribe(
      (result) => {
        Swal.fire({
          title: 'Cliente atualizado com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          window.open('http://localhost:4200/clientes', '_self');
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado! Verifique o erro no console.',
        });
        console.error(error);
      }
    );
  }
}
