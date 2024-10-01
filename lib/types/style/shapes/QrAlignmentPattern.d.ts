import { type IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { type IQrColor } from "../QrColor";
export declare const alignmentPatternSize = 5;
interface IQrAlignmentPatternShape extends IQrSVGShape {
}
declare abstract class BaseAlignmentPatternShape implements IQrAlignmentPatternShape {
    pixelShape: IQrPixelShape;
    color: IQrColor;
    constructor(pixelShape: IQrPixelShape, color?: IQrColor);
    abstract createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
    protected addAlignmentPatternCoordinates(designer: QrShapesDesigner, x: number, y: number): void;
}
declare class Square extends BaseAlignmentPatternShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
declare class Circle extends BaseAlignmentPatternShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
export declare const QrAlignmentPatternShape: {
    Square: typeof Square;
    Circle: typeof Circle;
};
export type { IQrAlignmentPatternShape };
