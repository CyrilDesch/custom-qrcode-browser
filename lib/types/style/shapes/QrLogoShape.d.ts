import { type IQrColor } from "../QrColor";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import type { IQrSVGWithImage } from "../SVGInterfaces";
interface IQrLogoShape extends IQrSVGWithImage {
}
declare abstract class BaseLogoShape implements IQrLogoShape {
    imageData: string | null;
    sizeRatio: number;
    padding: number;
    color: IQrColor;
    constructor(imageData?: string | null, sizeRatio?: number, padding?: number, color?: IQrColor);
    protected addLogoCoordinates(x: number, y: number, width: number, height: number, designer: QrShapesDesigner): void;
    protected createImageElement(x: number, y: number, width: number, height: number, clipPathId?: string): SVGElement;
    abstract createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
}
declare class SquareShape extends BaseLogoShape {
    createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
}
declare class CircleShape extends BaseLogoShape {
    createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
    private addCircleCoordinates;
}
declare class RoundCornersShape extends BaseLogoShape {
    createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
}
declare class RhombusShape extends BaseLogoShape {
    createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
    private addRhombusLogoCoordinates;
}
export declare const QrLogoShape: {
    Square: typeof SquareShape;
    Circle: typeof CircleShape;
    RoundCorners: typeof RoundCornersShape;
    Rhombus: typeof RhombusShape;
};
export type { IQrLogoShape };
