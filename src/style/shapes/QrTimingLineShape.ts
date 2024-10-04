import { getNeighbors, PixelType } from "../../encoder/QrCodeMatrix";
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

  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    let pathData = "";
    const timingLineEnd = designer.qrXEnd - 7;

    for (let i = x + 1; i < timingLineEnd; i++) {
      if (designer.qrMatrix.get(x, i) === PixelType.DarkPixel) {
        designer.addUsedCoordinate(x, i);
        pathData += this.pixelShape.createSvgElement(
          x,
          i,
          1,
          getNeighbors(designer.qrMatrix, x, i),
        );
      } else if (designer.qrMatrix.get(i, y) === PixelType.LightPixel) {
        designer.addUsedCoordinate(i, y);
        pathData += this.pixelShape.createSvgElement(
          i,
          y,
          1,
          getNeighbors(designer.qrMatrix, i, y),
        );
      }
    }
    const svg = createSvgPathFromString(pathData);
    this.color.applyToElement(svg, designer.mainSvg);
    return svg;
  }
}
