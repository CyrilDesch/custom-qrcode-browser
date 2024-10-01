export declare class Neighbors {
    topLeft: boolean;
    topRight: boolean;
    left: boolean;
    top: boolean;
    right: boolean;
    bottomLeft: boolean;
    bottom: boolean;
    bottomRight: boolean;
    constructor(top?: boolean, right?: boolean, bottom?: boolean, left?: boolean, topRight?: boolean, bottomRight?: boolean, bottomLeft?: boolean, topLeft?: boolean);
    private static emptyInstance;
    static get empty(): Neighbors;
    get hasAny(): boolean;
    get hasAllNearest(): boolean;
    get hasAll(): boolean;
}
