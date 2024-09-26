import { SVG_NS } from "../../utils/utils";
import { QrColor, type IQrColor } from "../QrColor";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import type { IQrSVGShape } from "../SVGInterfaces";

const eyeSize = 3;
const centerOffset = eyeSize / 2;

/**
 * Interface pour définir la forme de la eyee interne du QR code.
 */
export interface IQrEyeShape extends IQrSVGShape {}

abstract class BaseEyeShape implements IQrEyeShape {
  constructor(
    public sizeRatio: number = 1,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  abstract createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement;

  protected addEyeCoordinates(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ) {
    for (let i = x; i < x + eyeSize; i++) {
      for (let j = y; j < y + eyeSize; j++) {
        designer.addUsedCoordinate(i, j);
      }
    }
  }
}

/**
 * Forme de la eyee carré pour le QR code.
 */
export class SquareEyeShape extends BaseEyeShape {
  constructor(
    public cornerRadius: number = 0,
    sizeRatio: number = 1,
    color: IQrColor,
  ) {
    super(sizeRatio, color);
  }

  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeCoordinates(x, y, designer);

    const rect = document.createElementNS(SVG_NS, "rect");
    const fitSize = eyeSize * this.sizeRatio;
    const corner = Math.min(Math.max(this.cornerRadius, 0), 0.5) * fitSize;

    rect.setAttribute("x", (x + (eyeSize - fitSize) / 2).toString());
    rect.setAttribute("y", (y + (eyeSize - fitSize) / 2).toString());
    rect.setAttribute("width", fitSize.toString());
    rect.setAttribute("height", fitSize.toString());
    rect.setAttribute("rx", corner.toString());
    rect.setAttribute("ry", corner.toString());

    this.color.applyToElement(rect, designer.mainSvg);
    return rect;
  }
}

/**
 * Forme circulaire pour la eyee du QR code.
 */
export class CircleEyeShape extends BaseEyeShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeCoordinates(x, y, designer);

    const circle = document.createElementNS(SVG_NS, "circle");
    const radius = (eyeSize / 2) * this.sizeRatio;

    circle.setAttribute("cx", (x + centerOffset).toString());
    circle.setAttribute("cy", (y + centerOffset).toString());
    circle.setAttribute("r", radius.toString());

    this.color.applyToElement(circle, designer.mainSvg);
    return circle;
  }
}

/**
 * Forme en losange pour la eyee du QR code.
 */
export class RhombusEyeShape extends BaseEyeShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeCoordinates(x, y, designer);

    const polygon = document.createElementNS(SVG_NS, "polygon");
    const fitSize = eyeSize * this.sizeRatio;
    const halfSize = fitSize / 2;

    // Points d'un losange
    const points = [
      `${halfSize},0`, // Haut
      `${fitSize},${halfSize}`, // Droite
      `${halfSize},${fitSize}`, // Bas
      `0,${halfSize}`, // Gauche
    ];

    const scaledPoints = points.map((point) => {
      const [pointX, pointY] = point.split(",").map(Number);
      return `${pointX! + x},${pointY! + y}`;
    });

    polygon.setAttribute("points", scaledPoints.join(" "));

    this.color.applyToElement(polygon, designer.mainSvg);
    return polygon;
  }
}

/**
 * Export des formes pour les différentes eyees du QR code.
 */
export const QrEyeShape = {
  Square: SquareEyeShape,
  Circle: CircleEyeShape,
  Rhombus: RhombusEyeShape,
};