export interface MainData {
    x: number;
    y: number;
}

export interface TokensInCirculation {
    height: number;
    totalTokensInCirculation: number;

    map(param: (token) => void): void;
}
