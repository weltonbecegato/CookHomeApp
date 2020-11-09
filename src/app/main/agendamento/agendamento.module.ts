import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { AgendamentoComponent } from './agendamento.component';
import { ClienteService } from '../services/cliente.service';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';

const routes = [
    {
        path     : 'agendamento',
        component: AgendamentoComponent
    }
];

@NgModule({
    declarations: [
        AgendamentoComponent
    ],
    imports     : [
        BrowserModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAkMG_ppV2oEGDalZbJikfJIjozX1oiiZE',
            language: 'pt'
        }),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,

        FuseSharedModule
    ],
    providers: [
        ClienteService
    ]
})
export class AgendamentoModule
{
}
