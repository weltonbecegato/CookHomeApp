import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class CozinheiroService {

  constructor(private _httpClient: HttpClient,
              private _router: Router) {
  }

  public salvarCozinheiro(input): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${environment.baseAPI}/api/cozinheiro`, input)
            .subscribe((response: any) => {
                resolve(response)
            }, reject);

    });
    }
}