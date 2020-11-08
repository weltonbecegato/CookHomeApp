import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class LoginService implements CanActivate {

  constructor(private _httpClient: HttpClient,
              private _router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated()) {
      if (state.url !== '/profile' && state.url !== '/login') {
        localStorage.setItem('REDIRECT_URL', state.url);
      }
      this._router.navigate(['./login']);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('AUTH_TOKEN'));

    if (token) {
      const current = new Date();
      current.setHours(current.getHours() - 1);
      const expiration = new Date(token.expireAt);
      return current <= expiration;
    }

    return false;
  }

  public login(input): Promise<any> {
    return new Promise((resolve, reject) => {
        this._httpClient.post(`${environment.baseAPI}/api/auth`, input)
            .subscribe((response: any) => {
                resolve(response)
            }, reject);

    });
  }

  public signIn(data): void {
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.setItem('AUTH_TOKEN', JSON.stringify(data));
    if (data.tipo === 1) {
      this._router.navigate([`/clienteHome/`]);
    } else if (data.tipo === 2) {
      this._router.navigate([`/cozinheiro/`]);
    }
    
  }

  public logout(): void {
    localStorage.removeItem('AUTH_TOKEN');
    this._router.navigate([`/`]);
  }

  static getAuthHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.getToken();
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token.accessToken}`);
    }

    return headers;
  }

  static getToken(): any {
    const token = JSON.parse(localStorage.getItem('AUTH_TOKEN'));
    return token;
  }

  static getUser(): any {
    var token = this.getToken();
    if (token)
      return token.user;
  }
}