import type { QrCodeMatrix } from "../encoder/QrCodeMatrix";
import type { QrOptions } from "../options/QrOptions";
export declare class QrShapesDesigner {
    qrMatrix: QrCodeMatrix;
    options: QrOptions;
    mainSvg: SVGElement;
    usedCoordinates: Set<string>;
    constructor(qrMatrix: QrCodeMatrix, options: QrOptions, mainSvg: SVGElement);
    get qrXOrigin(): number;
    get qrYOrigin(): number;
    get qrXEnd(): number;
    get qrYEnd(): number;
    get shapes(): import("..").QrShapes;
    addUsedCoordinate(x: number, y: number): void;
    isUsedCoordinate(x: number, y: number): boolean;
    private get qrCodeElementStartCoordinate();
    drawSvg(): void;
}
