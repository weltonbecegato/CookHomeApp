import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { CozinheiroService } from '../services/cozinheiro.service';

@Component({
    selector     : 'cadastro',
    templateUrl  : './cadastro.component.html',
    styleUrls    : ['./cadastro.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy
{
    registerForm: FormGroup;
    cadastro: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _servicoCliente: ClienteService,
        private _servicoCozinheiro: CozinheiroService,
        private _roteador: Router
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.cadastro = { cidadeId: 3 };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            nome           : ['', Validators.required],
            sobrenome      : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            telefone       : ['', Validators.required],
            senha          : ['', Validators.required],
            tipo           : ['', Validators.required],
            documento      : ['', Validators.required],

        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    salvarCadastro(): void {
        console.log(this.cadastro);
        if (this.cadastro.tipo === "1") {
            this._servicoCliente.salvarCliente(this.cadastro).then(res => {
                alert('Conta cadastrada com sucesso.');
                this._roteador.navigate(['/login']);
            }).catch(erro => {
                console.log(erro);
            });
        } else {
            this._servicoCozinheiro.salvarCozinheiro(this.cadastro).then(res => {
                alert('Conta cadastrada com sucesso.');
                this._roteador.navigate(['/login']);
            }).catch(erro => {
                console.log(erro);
            });
        }
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};
