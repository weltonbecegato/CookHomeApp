import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class AgendamentoService {

    constructor(private _httpClient: HttpClient,
        private _router: Router) {
    }

    public salvarAgendamento(input): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.baseAPI}/api/agendamento`, input)
                .subscribe((response: any) => {
                    resolve(response)
                }, reject);

        });
    }

    public atualizarAgendamento(input): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${environment.baseAPI}/api/agendamento`, input)
                .subscribe((response: any) => {
                    resolve(response)
                }, reject);

        });
    }

    public deletarAgendamento(input): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${environment.baseAPI}/api/agendamento/${input.id}`)
                .subscribe((response: any) => {
                    resolve(response)
                }, reject);

        });
    }


    public opterAgendamento(input): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.baseAPI}/api/agendamento/${input.id}`)
                .subscribe((response: any) => {
                    resolve(response)
                }, reject);

        });
    }

    public opterAgendamentoPorCliente(cliente): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.baseAPI}/api/agendamento/cliente/${cliente}`)
                .subscribe((response: any) => {
                    resolve(response)
                }, reject);

        });
    }




}