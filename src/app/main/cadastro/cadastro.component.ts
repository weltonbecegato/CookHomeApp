import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ClienteService } from 'app/main/services/cliente.service';
import { CozinheiroService } from 'app/main/services/cozinheiro.service';
import { EnderecoService } from '../services/endereco.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector     : 'cadastro',
    templateUrl  : './cadastro.component.html',
    styleUrls    : ['./cadastro.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CadastroComponent implements OnInit, OnDestroy
{
    basicoForm: FormGroup;
    enderecoForm: FormGroup;
    acessoForm: FormGroup;
    tipoForm: FormGroup;
    cozinheiroForm: FormGroup;
    cadastro: any;
    passo: number;
    passoTitulo: string;
    erroTexto: string;
    tipoCulinarias: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _servicoCliente: ClienteService,
        private _servicoCozinheiro: CozinheiroService,
        private _enderecoService: EnderecoService,
        private _roteador: Router,
        private _snackBar: MatSnackBar
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
        this.cadastro = { culinarias: [] };
        this.passo = 1;
        this.tipoCulinarias = [];
        this.mudarTitulo();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.tipoForm = this._formBuilder.group({
            tipo           : [''],
        });

        this.basicoForm = this._formBuilder.group({
            nome           : ['', Validators.required],
            sobrenome      : ['', Validators.required],
            telefone       : ['', Validators.required],
            documento      : ['', Validators.required]
        });

        this.cozinheiroForm = this._formBuilder.group({
            linkedin        : [''],
            site           : [''],
            culinarias     : ['']
        });

        this.enderecoForm = this._formBuilder.group({
            endereco       : ['', Validators.required],
            numero         : ['', Validators.required],
            complemento    : [''],
            bairro         : ['', Validators.required],
            cidade         : ['', Validators.required],
            estado         : ['', Validators.required],
            cep            : ['', Validators.required],
        });

        this.acessoForm = this._formBuilder.group({
            email          : ['', [Validators.required, Validators.email]],
            senha          : ['', Validators.required],
            termos         : ['', Validators.required],
        });

        this._servicoCozinheiro.obterTiposCulinaria().then(resposta => {
            this.tipoCulinarias = resposta;
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
        if (this.cadastro.tipo === 1) {
            this._servicoCliente.salvarCliente(this.cadastro).then(res => {
                this.avancar();
            }).catch(erro => {
                console.log(erro);
                this.erroTexto = erro.error.email[0];
            });
        } else {
            this._servicoCozinheiro.salvarCozinheiro(this.cadastro).then(res => {
                this.avancar();
            }).catch(erro => {
                console.log(erro);
                this.erroTexto = erro.error.email[0];
            });
        }
    }

    avancar(): void {
        console.log(this.cadastro);
        if (this.passo === 3) {
            if (this.cadastro.culinarias.length < 1) {
                this.erroTexto = 'Selecione ao menos um tipo de culinaria'
                return;
            } else {
                this.erroTexto = null;
            }
        }

        if (this.cadastro.tipo === 1 && this.passo === 2) {
            this.passo = this.passo + 2;    
        }
        else {
            this.passo = this.passo + 1;
        }
        
        this.mudarTitulo();
    }

    voltar(): void {
        if (this.cadastro.tipo === 1 && this.passo === 4) {
            this.passo = this.passo -2;    
        }
        else {
            this.passo = this.passo - 1;
        }
        this.mudarTitulo();
    }

    mudarTitulo(): void {
        switch (this.passo) {
            case 1: 
                this.passoTitulo = 'Selecione seu perfil';
                break;
            case 2:
                this.passoTitulo = 'Informe seus dados pessoais';
                break;
            case 3:
                this.passoTitulo = 'Informe seus dados de cozinheiro';
                break;
            case 4:
                this.passoTitulo = 'Informe seus dados de endereço';
                break;
            case 5: 
                this.passoTitulo = 'Informe seus dados de acesso';
                break;
            case 6: 
                this.passoTitulo = 'Cadastro concluído!';
                break;
        }
    }

    verificarPasso(): boolean {
        switch (this.passo) {
            case 1: return !(this.cadastro.tipo === 1 || this.cadastro.tipo === 2);
            case 2: return this.basicoForm.invalid;
            case 3: return this.cozinheiroForm.invalid;
            case 4: return this.enderecoForm.invalid;
            case 5: return this.acessoForm.invalid;
        }
    }

    consultarCep(): void {
        this._enderecoService.consultarCep(this.cadastro.cep).then(resposta => {
            if (resposta !== null) {
                this.cadastro.endereco = resposta.endereco;
                this.cadastro.bairro = resposta.bairro;
                this.cadastro.cidade = resposta.cidade;
                this.cadastro.estado = resposta.estado;
            }
        });
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
