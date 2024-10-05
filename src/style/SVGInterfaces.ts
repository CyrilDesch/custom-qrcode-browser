import type { QrShapesDesigner } from "./QrShapesDesigner";

/**
 * Interface for SVG shapes in the QR code.
 */

export interface IQrSVGShape {
  /**
   * Create an SVG Element with the shape defined
   */
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement;
}

export interface IQrSVGWithImage {
  imageData: string | null;
  sizeRatio: number; // Percentage of parent
  padding: number; // Padding between image and bg color

  /**
   * Create an SVG Element with the image defined
   */
  createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
}
