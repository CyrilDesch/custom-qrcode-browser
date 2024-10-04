import { QrPixelShape, type IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import {
  createSvgGroupFromElements,
  createSvgPathFromString,
} from "../../utils/SvgUtils";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { getNeighbors } from "../../encoder/QrCodeMatrix";
import { QrColor, type IQrColor } from "../QrColor";
import { QrEyeShape } from "./QrEyeShape";

export const eyeFrameSize = 7;

/**
 * Interface représentant la forme du cadre du QR code.
 */
interface IQrEyeFrameShape extends IQrSVGShape {}

abstract class BaseEyeFrameShape implements IQrEyeFrameShape {
  constructor(
    public pixelShape: IQrPixelShape,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  abstract createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement;

  protected addEyeFrameCoordinates(
    designer: QrShapesDesigner,
    x: number,
    y: number,
  ) {
    for (let i = x; i < x + eyeFrameSize; i++) {
      for (let j = y; j < y + eyeFrameSize; j++) {
        if (
          i === x ||
          j === y ||
          i === x + eyeFrameSize - 1 ||
          j === y + eyeFrameSize - 1
        ) {
          designer.addUsedCoordinate(i, j);
        }
      }
    }
  }
}

/**
 * Forme par défaut pour le cadre du QR code (7x7 avec cadre de 1px d'épaisseur).
 */
class Square extends BaseEyeFrameShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeFrameCoordinates(designer, x, y);

    if (this.pixelShape instanceof QrPixelShape.NeighborAware) {
      const outerPath = new QrEyeShape.Square(
        this.pixelShape.cornerRadius,
        eyeFrameSize,
        this.color,
      ).createSvgElement(x, y, designer);
      const innerPath = new QrEyeShape.Square(
        this.pixelShape.cornerRadius - 0.05 * this.pixelShape.sizeRatio, // Fix inner corner radius
        eyeFrameSize - this.pixelShape.sizeRatio * 2,
        designer.options.shapes.background?.color ?? new QrColor.Solid("white"),
      ).createSvgElement(
        x + this.pixelShape.sizeRatio,
        y + this.pixelShape.sizeRatio,
        designer,
      );
      return createSvgGroupFromElements([outerPath, innerPath]);
    } else {
      let pathData = "";
      for (let i = x; i < x + eyeFrameSize; i++) {
        for (let j = y; j < y + eyeFrameSize; j++) {
          if (
            i === x ||
            j === y ||
            i === x + eyeFrameSize - 1 ||
            j === y + eyeFrameSize - 1
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
      const svg = createSvgPathFromString(pathData);
      this.color.applyToElement(svg, designer.mainSvg);
      return svg;
    }
  }
}

/**
 * Forme de cadre circulaire.
 */
class Circle extends BaseEyeFrameShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeFrameCoordinates(designer, x, y);
    const cx = x + eyeFrameSize / 2;
    const cy = y + eyeFrameSize / 2;
    const r = eyeFrameSize / 2; // Rayon du cercle ajusté
    let pathData = "";

    if (this.pixelShape instanceof QrPixelShape.NeighborAware) {
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

      const pathElement = createSvgPathFromString(pathData);
      pathElement.setAttribute("fill-rule", "evenodd");
      this.color.applyToElement(pathElement, designer.mainSvg);
      return pathElement;
    } else {
      // Si les points ne sont pas liés, dessiner le cercle avec des pixels
      const thickness = 0.5; // Épaisseur du contour du cercle

      for (let i = x; i < x + eyeFrameSize; i++) {
        for (let j = y; j < y + eyeFrameSize; j++) {
          const dx = i - cx + 0.5;
          const dy = j - cy + 0.5;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance >= r - thickness && distance <= r + thickness) {
            pathData += this.pixelShape.createSvgElement(
              i,
              j,
              1,
              getNeighbors(designer.qrMatrix, i, j),
            );
          }
        }
      }
      const svg = createSvgPathFromString(pathData);
      this.color.applyToElement(svg, designer.mainSvg);
      return svg;
    }
  }
}

// Export des classes et objets
export const QrEyeFrameShape = {
  Square,
  Circle,
};

export type { IQrEyeFrameShape };
