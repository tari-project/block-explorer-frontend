export interface ClusterPoint {
    group: string;
    size: number;
    color: string;
    tooltip: string;
}

export interface Child {
    children: {
        ClusterPoint;
    };
}

export interface Children {
    children: Child[];
}
