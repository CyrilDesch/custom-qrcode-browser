import { type IQrColor } from "../QrColor";
import type { IQrSVGWithImage } from "../SVGInterfaces";
export declare class QrBackground implements IQrSVGWithImage {
    imageData: string | null;
    sizeRatio: number;
    padding: number;
    color: IQrColor;
    constructor(imageData?: string | null, sizeRatio?: number, padding?: number, color?: IQrColor);
    createSvgElement(mainSvg: SVGElement): SVGElement;
}
