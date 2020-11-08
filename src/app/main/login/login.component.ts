import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from '../services/login.service';
import { AuthModel } from '../model/auth.model';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    model = new AuthModel();

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: LoginService,
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            senha: ['', Validators.required]
        });
    }

    onLogin(): void {
        this._authService
            .login(this.model)
            .then((response: any) => {
                console.log(response);
                this._authService.signIn(response);
            })
            .catch(err => {
                console.log(err);
                if (err.status === 404) {
                    alert('Email não cadastrado');
                } else if (err.status === 401) {
                    alert('Senha não confere');
                }
                else if (err.status === 400) {
                    alert('Senha não confere');
                } else {
                    alert('Houve um erro ao processar sua requisição');
                }
            });
    }
}
