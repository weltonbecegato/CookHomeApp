import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FuseSharedModule } from '@fuse/shared.module';
import { ClienteService } from '../services/cliente.service';
import { MatSelectModule } from '@angular/material/select';
import { CozinheiroService } from '../services/cozinheiro.service';
import { CadastroComponent } from './cadastro.component';
import { EnderecoService } from '../services/endereco.service';

const routes = [
    {
        path: 'cadastro',
        component: CadastroComponent
    }
];

@NgModule({
    declarations: [
        CadastroComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,

        FuseSharedModule
    ],
    providers: [
        ClienteService,
        CozinheiroService,
        EnderecoService
    ]
})
export class CadastroModule {
}
