import { type IQrColor } from "../QrColor";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import type { IQrSVGShape } from "../SVGInterfaces";
export interface IQrEyeShape extends IQrSVGShape {
}
declare abstract class BaseEyeShape implements IQrEyeShape {
    size: number;
    color: IQrColor;
    constructor(size?: number, color?: IQrColor);
    abstract createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
    protected addEyeCoordinates(x: number, y: number, designer: QrShapesDesigner): void;
}
export declare class SquareEyeShape extends BaseEyeShape {
    cornerRadius: number;
    constructor(cornerRadius: number, size: number | undefined, color: IQrColor);
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
export declare class CircleEyeShape extends BaseEyeShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
export declare class RhombusEyeShape extends BaseEyeShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
export declare const QrEyeShape: {
    Square: typeof SquareEyeShape;
    Circle: typeof CircleEyeShape;
    Rhombus: typeof RhombusEyeShape;
};
export {};
