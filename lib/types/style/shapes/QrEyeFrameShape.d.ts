import { type IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { type IQrColor } from "../QrColor";
export declare const eyeFrameSize = 7;
interface IQrEyeFrameShape extends IQrSVGShape {
}
declare abstract class BaseEyeFrameShape implements IQrEyeFrameShape {
    pixelShape: IQrPixelShape;
    color: IQrColor;
    constructor(pixelShape: IQrPixelShape, color?: IQrColor);
    abstract createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
    protected addEyeFrameCoordinates(designer: QrShapesDesigner, x: number, y: number): void;
}
declare class Square extends BaseEyeFrameShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
declare class Circle extends BaseEyeFrameShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
export declare const QrEyeFrameShape: {
    Square: typeof Square;
    Circle: typeof Circle;
};
export type { IQrEyeFrameShape };
