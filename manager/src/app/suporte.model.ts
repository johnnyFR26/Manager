import { Client } from './client.model';
export interface Suporte {
        id: number;
        name: string;
        type: string;
        number: string;
        email: string;
        clients: Client[];
    }