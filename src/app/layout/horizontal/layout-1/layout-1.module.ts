import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { HorizontalLayout1Component } from 'app/layout/horizontal/layout-1/layout-1.component';

@NgModule({
    declarations: [
        HorizontalLayout1Component
    ],
    imports     : [
        MatSidenavModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        ToolbarModule
    ],
    exports     : [
        HorizontalLayout1Component
    ]
})
export class HorizontalLayout1Module
{
}
