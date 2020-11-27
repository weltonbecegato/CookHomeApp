import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { CozinheiroService } from '../services/cozinheiro.service';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AgendamentoComponent implements OnInit, OnDestroy {
    lat: number = -23.6485165;
    lng: number = -46.722005;
    agendamentoForm: FormGroup;
    pesquisa: any;
    resultado: any[];
    tipoCulinarias: any[];
    usuarioLogado: any;
    itemSelecionado: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _cozinheiroService: CozinheiroService,
        private _roteador: Router
    ) {
        this.tipoCulinarias = [];
        this.usuarioLogado = LoginService.getUser();
        this.resultado = [];
        this.pesquisa = { idCliente: this.usuarioLogado.id };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.agendamentoForm = this._formBuilder.group({
            nome: [''],
            tipoCulinarias: [''],
            distancia: ['']
        });

        this._cozinheiroService.obterTiposCulinaria().then(resposta => {
            this.tipoCulinarias = resposta;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    buscarCozinheiros(): void {
        this._cozinheiroService.buscarCozinheiros(this.pesquisa).then(resposta => {
            this.resultado = resposta;
        }).catch(err => console.log(err));
    }

    voltar(): void {
        this.resultado = [];
    }

    clickedMarker(item: any) {
        this.itemSelecionado = item;
    }

    agendar(): void {

    }
}