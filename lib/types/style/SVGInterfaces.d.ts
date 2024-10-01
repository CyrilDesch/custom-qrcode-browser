import type { QrShapesDesigner } from "./QrShapesDesigner";
export interface IQrSVGShape {
    createSvgElement(x: number, y: number, designer: QrShapesDesigner): SVGElement;
}
export interface IQrSVGWithImage {
    imageData: string | null;
    sizeRatio: number;
    padding: number;
    createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
}
