import { PixelType } from "../../encode/QrCodeMatrix";
import { getNeighbors } from "../../utils/Neighbors";
import { createSvgPathFromString } from "../../utils/SvgUtils";
import type { IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { QrColor, type IQrColor } from "../QrColor";

/**
 * Interface to define the shape of the QR code matrix pixel.
 */
export interface IQrMatrixPixelShape extends IQrSVGShape {}

export class QrMatrixPixelShape implements IQrMatrixPixelShape {
  constructor(
    public pixelShape: IQrPixelShape,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  /**
   * Create an SVG path for the dark pixels of the QR code, except those already used.
   */
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    let pathData = "";
    const matrixSize = designer.qrMatrix.size;

    // Loop through the QR matrix and generate SVG path data for dark pixels
    for (let i = x; i < matrixSize; i++) {
      for (let j = y; j < matrixSize; j++) {
        if (this.isDarkPixel(i, j, designer)) {
          designer.addUsedCoordinate(i, j); // Mark the coordinate as used

          const neighbors = getNeighbors(designer.qrMatrix, i, j); // Get neighboring pixels
          pathData += this.pixelShape.createSvgElement(i, j, 1, neighbors); // Create path for the pixel
        }
      }
    }

    const svg = createSvgPathFromString(pathData);
    this.color.applyToElement(svg, designer.mainSvg);
    return svg;
  }

  /**
   * Helper method to check if a pixel is dark and not already used.
   */
  private isDarkPixel(
    i: number,
    j: number,
    designer: QrShapesDesigner,
  ): boolean {
    return (
      designer.qrMatrix.get(i, j) === PixelType.DarkPixel &&
      !designer.isUsedCoordinate(i, j)
    );
  }
}
