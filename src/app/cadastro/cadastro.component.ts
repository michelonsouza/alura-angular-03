import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CunsultaCepService } from '../services/cunsulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private service: CunsultaCepService,
  ) {}

  estados = [
    {
      value: 'AC',
      label: 'Acre',
    },
    {
      value: 'AL',
      label: 'Alagoas',
    },
    {
      value: 'AP',
      label: 'Amapá',
    },
    {
      value: 'AM',
      label: 'Amazonas',
    },
    {
      value: 'BA',
      label: 'Bahia',
    },
    {
      value: 'CE',
      label: 'Ceará',
    },
    {
      value: 'DF',
      label: 'Distrito Federal',
    },
    {
      value: 'ES',
      label: 'Espírito Santo',
    },
    {
      value: 'GO',
      label: 'Goiás',
    },
    {
      value: 'MA',
      label: 'Maranhão',
    },
    {
      value: 'MT',
      label: 'Mato Grosso',
    },
    {
      value: 'MS',
      label: 'Mato Grosso do Sul',
    },
    {
      value: 'MG',
      label: 'Minas Gerais',
    },
    {
      value: 'PA',
      label: 'Pará',
    },
    {
      value: 'PB',
      label: 'Paraíba',
    },
    {
      value: 'PR',
      label: 'Paraná',
    },
    {
      value: 'PE',
      label: 'Pernambuco',
    },
    {
      value: 'PI',
      label: 'Piauí',
    },
    {
      value: 'RJ',
      label: 'Rio de Janeiro',
    },
    {
      value: 'RN',
      label: 'Rio Grande do Norte',
    },
    {
      value: 'RS',
      label: 'Rio Grande do Sul',
    },
    {
      value: 'RO',
      label: 'Rondônia',
    },
    {
      value: 'RR',
      label: 'Roraima',
    },
    {
      value: 'SC',
      label: 'Santa Catarina',
    },
    {
      value: 'SP',
      label: 'São Paulo',
    },
    {
      value: 'SE',
      label: 'Sergipe',
    },
    {
      value: 'TO',
      label: 'Tocantins',
    },
    {
      value: 'EX',
      label: 'Estrangeiro',
    },
  ];

  ngOnInit(): void {}

  register(form: NgForm) {
    if (form.valid) {
      this.router.navigate(['/sucesso']);
      return;
    }
    console.log({ controls: form.controls });
  }

  consultaCEP(event: FocusEvent, form: NgForm) {
    const { value } = event?.target as HTMLInputElement;

    if (!value || value.length < 8) {
      return;
    }

    this.service.getConsultaCep(value).subscribe({
      next: response => {
        this.populandoEndereco(response, form);
      },
    });
  }

  populandoEndereco(data: any, form: NgForm) {
    form.form.patchValue({
      endereco: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    });
  }
}
