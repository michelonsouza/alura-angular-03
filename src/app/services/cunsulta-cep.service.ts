import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CunsultaCepService {
  private readonly API_URL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  getConsultaCep(cep: string) {
    return this.http.get(`${this.API_URL}/${cep.replace('-', '')}/json`);
  }
}
