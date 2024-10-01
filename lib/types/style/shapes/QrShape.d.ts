import { QrCodeMatrix } from "../../encoder/QrCodeMatrix";
export interface IQrShape {
    qrOriginStart: [number, number];
    apply(matrix: QrCodeMatrix): QrCodeMatrix;
    pixelInShape(i: number, j: number, modifiedByteMatrix: QrCodeMatrix): boolean;
}
export declare class Square implements IQrShape {
    qrOriginStart: [number, number];
    apply(matrix: QrCodeMatrix): QrCodeMatrix;
    pixelInShape(): boolean;
}
export declare class Circle implements IQrShape {
    padding: number;
    seed: number;
    private random;
    private addedPoints;
    qrOriginStart: [number, number];
    constructor(padding?: number, seed?: number);
    apply(matrix: QrCodeMatrix): QrCodeMatrix;
    pixelInShape(i: number, j: number): boolean;
    private isAdjacentToEyeFrame;
}
export declare const QrShape: {
    Square: typeof Square;
    Circle: typeof Circle;
};
