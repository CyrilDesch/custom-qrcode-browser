import { QrErrorCorrectionLevel } from "./QrErrorCorrectionLevel";
import { QrShapes } from "./QrShapes";
export declare class QrOptions {
    sizeRatio: number;
    shapes: QrShapes;
    errorCorrectionLevel: QrErrorCorrectionLevel;
    constructor(sizeRatio: number, shapes: QrShapes, errorCorrectionLevel: QrErrorCorrectionLevel);
}
export declare class QrOptionsBuilder {
    sizeRatio: number;
    shapes: QrShapes;
    errorCorrectionLevel: QrErrorCorrectionLevel;
    setSizeRatio(sizeRatio: number): QrOptionsBuilder;
    setShapes(shapes: QrShapes): QrOptionsBuilder;
    setErrorCorrectionLevel(errorCorrectionLevel: QrErrorCorrectionLevel): QrOptionsBuilder;
    build(): QrOptions;
}
