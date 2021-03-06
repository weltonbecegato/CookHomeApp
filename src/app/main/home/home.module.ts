import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { homeComponent } from './home.component';
import { ClienteService } from '../services/cliente.service';
import { MatSelectModule } from '@angular/material/select';
import { CozinheiroService } from '../services/cozinheiro.service';

const routes = [
    {
        path     : 'home',
        component: homeComponent
    }
];

@NgModule({
    declarations: [
        homeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,

        FuseSharedModule
    ]
})
export class homeModule
{
}
