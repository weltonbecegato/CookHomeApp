import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ClienteService {

  constructor(private _httpClient: HttpClient,
              private _router: Router) {
  }

  public salvarCliente(input): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${environment.baseAPI}/api/cliente`, input)
            .subscribe((response: any) => {
                resolve(response)
            }, reject);

    });
    }
}