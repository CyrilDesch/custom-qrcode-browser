import { Neighbors } from "../utils/Neighbors";
import type { QrCode } from "./QrEncoder";
export declare enum PixelType {
    DarkPixel = "DarkPixel",
    LightPixel = "LightPixel",
    Background = "Background"
}
export declare class QrCodeMatrix {
    size: number;
    private types;
    origin: number;
    constructor(size: number);
    get(i: number, j: number): PixelType;
    set(i: number, j: number, type: PixelType): void;
    copy(): QrCodeMatrix;
}
export declare function getNeighbors(matrix: QrCodeMatrix, i: number, j: number): Neighbors;
export declare function getReverseNeighbors(matrix: QrCodeMatrix, i: number, j: number): Neighbors;
export declare function toQrMatrix(byteMatrix: QrCode): QrCodeMatrix;
