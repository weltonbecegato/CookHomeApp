import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { LoginModule } from './main/login/login.module';
import { LoginService } from './main/services/login.service';
import { CadastroModule } from './main/cadastro/cadastro.module';
import { AgendamentoModule } from './main/agendamento/agendamento.module';
import { LoginComponent } from './main/login/login.component';
import { homeModule } from './main/home/home.module';

const appRoutes: Routes = [
    {
        path      : '',
        canActivate: [LoginService],
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        FooterModule,
        LoginModule,
        CadastroModule,
        AgendamentoModule,
        homeModule,
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
