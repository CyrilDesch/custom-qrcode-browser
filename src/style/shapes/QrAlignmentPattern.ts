import { QrPixelShape, type IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import {
  createSvgGroupFromElements,
  createSvgPathFromString,
} from "../../utils/utils";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { getNeighbors } from "../../encoder/QrCodeMatrix";
import { QrColor, type IQrColor } from "../QrColor";
import { QrEyeShape } from "./QrEyeShape";

export const alignmentPatternSize = 5;

/**
 * Interface représentant la forme du cadre du QR code.
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
 * Forme par défaut pour le cadre du QR code (7x7 avec cadre de 1px d'épaisseur).
 */
class Square extends BaseAlignmentPatternShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addAlignmentPatternCoordinates(designer, x, y);

    if (this.pixelShape instanceof QrPixelShape.NeighborAware) {
      const outerPath = new QrEyeShape.Square(
        this.pixelShape.cornerRadius,
        alignmentPatternSize,
        this.color,
      ).createSvgElement(x, y, designer);
      const innerPath = new QrEyeShape.Square(
        this.pixelShape.cornerRadius - 0.05 * this.pixelShape.sizeRatio, // Fix inner corner radius
        alignmentPatternSize - this.pixelShape.sizeRatio * 2,
        designer.options.shapes.background?.color ?? new QrColor.Solid("white"),
      ).createSvgElement(
        x + this.pixelShape.sizeRatio,
        y + this.pixelShape.sizeRatio,
        designer,
      );
      const path = createSvgPathFromString(
        this.pixelShape.createSvgElement(
          x + 2,
          y + 2,
          1,
          getNeighbors(designer.qrMatrix, x + 2, y + 2),
        ),
      );
      this.color.applyToElement(path, designer.mainSvg);
      return createSvgGroupFromElements([outerPath, innerPath, path]);
    } else {
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
}

/**
 * Forme de cadre circulaire.
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
    const r = alignmentPatternSize / 2; // Rayon du cercle ajusté
    let pathData = "";

    const rInner = r - 1;

    // Création d'un anneau circulaire (cercle vide à l'intérieur)
    pathData = `
        M ${cx + r}, ${cy}
        A ${r},${r} 0 1,0 ${cx - r},${cy}
        A ${r},${r} 0 1,0 ${cx + r},${cy}
        M ${cx + rInner}, ${cy}
        A ${rInner},${rInner} 0 1,1 ${cx - rInner},${cy}
        A ${rInner},${rInner} 0 1,1 ${cx + rInner},${cy}
      `;

    pathData += this.pixelShape.createSvgElement(
      x + 2,
      y + 2,
      1,
      getNeighbors(designer.qrMatrix, x + 2, y + 2),
    );

    const pathElement = createSvgPathFromString(pathData);
    pathElement.setAttribute("fill-rule", "evenodd");
    this.color.applyToElement(pathElement, designer.mainSvg);
    return pathElement;
  }
}

// Export des classes et objets
export const QrAlignmentPatternShape = {
  Square,
  Circle,
};

export type { IQrAlignmentPatternShape };
