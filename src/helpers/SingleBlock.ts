import { InputsEntity, KernelsEntity, OutputsEntity } from './Blocks';

export interface Inputs extends InputsEntity {
    group: string;
    size: number;
    color: string;
}

export interface Kernels extends KernelsEntity {
    group: string;
    size: number;
    color: string;
}

export interface Outputs extends OutputsEntity {
    group: string;
    size: number;
    color: string;
}
