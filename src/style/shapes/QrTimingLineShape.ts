import { PixelType } from "../../encode/QrCodeMatrix";
import { getNeighbors } from "../../utils/Neighbors";
import { createSvgPathFromString } from "../../utils/SvgUtils";
import type { IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { QrColor, type IQrColor } from "../QrColor";

export class QrTimingLineShape implements IQrSVGShape {
  constructor(
    public pixelShape: IQrPixelShape,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  /**
   * Creates an SVG element representing the timing line in a QR code.
   * The timing line alternates between dark and light pixels.
   */
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    let pathData = "";
    const timingLineEnd = designer.qrXEnd - 7;

    // Process pixels for the timing line in both directions
    for (let i = x + 1; i < timingLineEnd; i++) {
      pathData += this.processPixel(x, i, designer); // Process horizontal timing line
      pathData += this.processPixel(i, y, designer); // Process vertical timing line
    }

    const svg = createSvgPathFromString(pathData);
    this.color.applyToElement(svg, designer.mainSvg);
    return svg;
  }

  /**
   * Helper method to process a single pixel and add it to the path if it's dark or light.
   */
  private processPixel(
    i: number,
    j: number,
    designer: QrShapesDesigner,
  ): string {
    const pixelType = designer.qrMatrix.get(i, j);

    // Only process if the pixel is of type DarkPixel
    if (pixelType === PixelType.DarkPixel) {
      designer.addUsedCoordinate(i, j);
      return this.pixelShape.createSvgElement(
        i,
        j,
        1,
        getNeighbors(designer.qrMatrix, i, j),
      );
    }
    return ""; // Return an empty string if no valid pixel
  }
}
