import type { IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { type IQrColor } from "../QrColor";
export interface IQrMatrixShape extends IQrSVGShape {
}
export declare class QrMatrixShape implements IQrMatrixShape {
    pixelShape: IQrPixelShape;
    color: IQrColor;
    constructor(pixelShape: IQrPixelShape, color?: IQrColor);
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
