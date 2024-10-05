import { QrPixelShape, type IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import {
  createSvgGroupFromElements,
  createSvgPathFromString,
} from "../../utils/SvgUtils";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { QrColor, type IQrColor } from "../QrColor";
import { QrEyeShape } from "./QrEyeShape";
import { getNeighbors } from "../../utils/Neighbors";

export const alignmentPatternSize = 5;

/**
 * Interface representing the alignment pattern shape for the QR code.
 */
interface IQrAlignmentPatternShape extends IQrSVGShape {}

abstract class BaseAlignmentPatternShape implements IQrAlignmentPatternShape {
  constructor(
    public pixelShape: IQrPixelShape,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  abstract createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement;

  protected addAlignmentPatternCoordinates(
    designer: QrShapesDesigner,
    x: number,
    y: number,
  ) {
    for (let i = x; i < x + alignmentPatternSize; i++) {
      for (let j = y; j < y + alignmentPatternSize; j++) {
        designer.addUsedCoordinate(i, j);
      }
    }
  }
}

/**
 * Square shape for alignment pattern
 */
class Square extends BaseAlignmentPatternShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addAlignmentPatternCoordinates(designer, x, y);

    if (this.pixelShape instanceof QrPixelShape.StickyCorners) {
      const outerPath = new QrEyeShape.Square(
        this.pixelShape.cornerRadius,
        alignmentPatternSize,
        this.color,
      ).createSvgElement(x, y, designer);
      const innerPath = new QrEyeShape.Square(
        this.pixelShape.cornerRadius - 0.05 * this.pixelShape.sizeRatio,
        alignmentPatternSize - this.pixelShape.sizeRatio * 2,
        designer.options.shapes.background?.color ?? new QrColor.Solid("white"),
      ).createSvgElement(
        x + this.pixelShape.sizeRatio,
        y + this.pixelShape.sizeRatio,
        designer,
      );
      const pixelPath = this.createPixelPath(x, y, designer);
      return createSvgGroupFromElements([outerPath, innerPath, pixelPath]);
    } else {
      return this.createSimpleSquarePath(x, y, designer);
    }
  }

  private createPixelPath(x: number, y: number, designer: QrShapesDesigner) {
    const pathData = this.pixelShape.createSvgElement(
      x + 2,
      y + 2,
      1,
      getNeighbors(designer.qrMatrix, x + 2, y + 2),
    );
    const path = createSvgPathFromString(pathData);
    this.color.applyToElement(path, designer.mainSvg);
    return path;
  }

  private createSimpleSquarePath(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ) {
    let pathData = "";
    for (let i = x; i < x + alignmentPatternSize; i++) {
      for (let j = y; j < y + alignmentPatternSize; j++) {
        if (
          i === x ||
          j === y ||
          i === x + alignmentPatternSize - 1 ||
          j === y + alignmentPatternSize - 1
        ) {
          pathData += this.pixelShape.createSvgElement(
            i,
            j,
            1,
            getNeighbors(designer.qrMatrix, i, j),
          );
        }
      }
    }

    pathData += this.pixelShape.createSvgElement(
      x + 2,
      y + 2,
      1,
      getNeighbors(designer.qrMatrix, x + 2, y + 2),
    );

    const svg = createSvgPathFromString(pathData);
    this.color.applyToElement(svg, designer.mainSvg);
    return svg;
  }
}

/**
 * Circular alignment pattern shape.
 */
class Circle extends BaseAlignmentPatternShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addAlignmentPatternCoordinates(designer, x, y);

    const cx = x + alignmentPatternSize / 2;
    const cy = y + alignmentPatternSize / 2;
    const r = alignmentPatternSize / 2;
    const pathData = this.createCirclePathData(cx, cy, r);

    const pixelPath = this.pixelShape.createSvgElement(
      x + 2,
      y + 2,
      1,
      getNeighbors(designer.qrMatrix, x + 2, y + 2),
    );
    const pathElement = createSvgPathFromString(`${pathData}${pixelPath}`);
    pathElement.setAttribute("fill-rule", "evenodd");

    this.color.applyToElement(pathElement, designer.mainSvg);
    return pathElement;
  }

  private createCirclePathData(cx: number, cy: number, r: number): string {
    const rInner = r - 1;
    return `
      M ${cx + r}, ${cy}
      A ${r},${r} 0 1,0 ${cx - r},${cy}
      A ${r},${r} 0 1,0 ${cx + r},${cy}
      M ${cx + rInner}, ${cy}
      A ${rInner},${rInner} 0 1,1 ${cx - rInner},${cy}
      A ${rInner},${rInner} 0 1,1 ${cx + rInner},${cy}
    `;
  }
}

export const QrAlignmentPatternShape = {
  Square,
  Circle,
};

export type { IQrAlignmentPatternShape };
