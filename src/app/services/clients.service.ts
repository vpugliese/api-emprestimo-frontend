import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  endpoint = 'clientes';
  api = environment.api;
  constructor(private http: HttpClient) {}

  listAllClients() {
    return this.http.get<IClient[]>(`${this.api}/${this.endpoint}`);
  }

  findClientByCpf(cpf: number) {
    return this.http.get<IClient>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  registerClient(client: IClient) {
    return this.http.post(`${this.api}/${this.endpoint}`, client);
  }

  updateClient(client: IClient, cpf: number) {
    return this.http.put(`${this.api}/${this.endpoint}/${cpf}`, client);
  }

  deleteClientByCpf(cpf: number) {
    return this.http.delete(`${this.api}/${this.endpoint}/${cpf}`);
  }
}
