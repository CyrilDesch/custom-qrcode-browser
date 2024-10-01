import type { IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { type IQrColor } from "../QrColor";
export declare class QrTimingLineShape implements IQrSVGShape {
    pixelShape: IQrPixelShape;
    color: IQrColor;
    constructor(pixelShape: IQrPixelShape, color?: IQrColor);
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
