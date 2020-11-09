import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class EnderecoService {

  constructor(private _httpClient: HttpClient,
              private _router: Router) {
  }

  public consultarCep(cep): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.get(`${environment.baseAPI}/api/endereco?cep=${cep}`)
            .subscribe((response: any) => {
                resolve(response)
            }, reject);

    });
    }
}