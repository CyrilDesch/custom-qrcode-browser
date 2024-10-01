import { QrOptions } from "../options/QrOptions";
import type { IQrData } from "../encoder/QrData";
export declare function QrCodeGenerator(svgElement: SVGSVGElement, data: IQrData, options?: QrOptions): QrCodeGeneratorImpl;
declare class QrCodeGeneratorImpl {
    private options;
    private svg;
    private codeMatrix;
    constructor(svgElement: SVGSVGElement, data: IQrData, options: QrOptions);
    generateSvg(): void;
}
export {};
