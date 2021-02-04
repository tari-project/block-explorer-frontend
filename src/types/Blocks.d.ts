export interface Blocks {
    blocks: BlocksEntity[];
    paging: Paging;
}
export interface BlocksEntity {
    spent_commitments?: null[] | null;
    confirmations: string;
    block: Block;
}
export interface Block {
    header: Header;
    body: Body;
    _miningTime: number;
    _weight: number;
    _filledPercent: number;
}
export interface Header {
    hash: string;
    version: number;
    height: number;
    prev_hash: string;
    timestamp: Timestamp;
    output_mr: string;
    range_proof_mr: string;
    kernel_mr: string;
    total_kernel_offset: string;
    nonce: string;
    pow: Pow;
}
export interface Timestamp {
    seconds: number;
    nanos: number;
}
export interface Pow {
    pow_algo: string;
    pow_data: string;
}
export interface Body {
    inputs: InputsEntity[];
    outputs: OutputsEntity[];
    kernels: KernelsEntity[];
}
export interface InputsEntity {
    features: Features;
    commitment: string;
}
export interface Features {
    flags: number;
    maturity: string;
}
export interface OutputsEntity {
    features: Features;
    commitment: string;
    range_proof: string;
    group: string;
    size: number;
    color: string;
}
export interface KernelsEntity {
    features: number;
    fee: string;
    lock_height: string;
    meta_info: string;
    linked_kernel: string;
    excess: string;
    excess_sig: ExcessSig;
    group: string;
    size: number;
    color: string;
}
export interface ExcessSig {
    public_nonce: string;
    signature: string;
}
export interface Paging {
    page: number;
    limit: number;
    sort: string;
    total: number;
}
