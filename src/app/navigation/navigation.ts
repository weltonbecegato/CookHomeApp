import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'Inicio',
        title    : 'Inicio',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/home'
    },
    {
        id       : 'Agendamento',
        title    : 'Agendamento',
        type     : 'item',
        icon     : 'schedule',
        url      : '/agendamento'
    },
    {
        id       : 'Pedidos',
        title    : 'Meus Pedidos',
        type     : 'item',
        icon     : 'list',
        url      : '/pedidos'
    },
    {
        id       : 'Cadastro',
        title    : 'Cadastro',
        type     : 'item',
        icon     : 'account_circle',
        url      : '/alterar-cadastro'
    },
];
