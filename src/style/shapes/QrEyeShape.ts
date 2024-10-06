import { SVG_NS } from "../../utils/SvgUtils";
import { QrColor, type IQrColor } from "../QrColor";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import type { IQrSVGShape } from "../SVGInterfaces";

const eyeSize = 3;
const centerOffset = eyeSize / 2;

/**
 * Interface for defining the shape of the QR code eye.
 */
export interface IQrEyeShape extends IQrSVGShape {}

abstract class BaseEyeShape implements IQrEyeShape {
  constructor(
    public size: number = eyeSize,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  /**
   * Add the coordinates of the eye to the designer.
   */
  protected addEyeCoordinates(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ) {
    for (let i = x; i < x + this.size; i++) {
      for (let j = y; j < y + this.size; j++) {
        designer.addUsedCoordinate(i, j);
      }
    }
  }

  /**
   * Helper method to set common SVG attributes for positioning and size.
   */
  protected setAttributes(
    element: SVGElement,
    attributes: Record<string, string>,
  ) {
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value),
    );
  }

  abstract createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement;
}

/**
 * Square-shaped eye for the QR code.
 */
export class SquareEyeShape extends BaseEyeShape {
  constructor(
    public cornerRadius: number = 0,
    size: number = eyeSize,
    color?: IQrColor,
  ) {
    super(size, color);
  }

  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeCoordinates(x, y, designer);
    const rect = document.createElementNS(SVG_NS, "rect");
    const fitSize = this.size;
    const corner = Math.min(Math.max(this.cornerRadius, 0), 0.5) * fitSize;

    this.setAttributes(rect, {
      x: x.toString(),
      y: y.toString(),
      width: fitSize.toString(),
      height: fitSize.toString(),
      rx: corner.toString(),
      ry: corner.toString(),
    });

    this.color.applyToElement(rect, designer.mainSvg);
    return rect;
  }
}

/**
 * Circle-shaped eye for the QR code.
 */
export class CircleEyeShape extends BaseEyeShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeCoordinates(x, y, designer);
    const circle = document.createElementNS(SVG_NS, "circle");
    const radius = this.size / 2;

    this.setAttributes(circle, {
      cx: (x + centerOffset).toString(),
      cy: (y + centerOffset).toString(),
      r: radius.toString(),
    });

    this.color.applyToElement(circle, designer.mainSvg);
    return circle;
  }
}

/**
 * Rhombus-shaped eye for the QR code.
 */
export class RhombusEyeShape extends BaseEyeShape {
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    this.addEyeCoordinates(x, y, designer);
    const polygon = document.createElementNS(SVG_NS, "polygon");
    const halfSize = this.size / 2;

    // Define points for a rhombus
    const points = [
      `${halfSize},0`, // Top
      `${this.size},${halfSize}`, // Right
      `${halfSize},${this.size}`, // Bottom
      `0,${halfSize}`, // Left
    ].map((point) => {
      const [px, py] = point.split(",").map(Number);
      return `${px! + x},${py! + y}`;
    });

    polygon.setAttribute("points", points.join(" "));

    this.color.applyToElement(polygon, designer.mainSvg);
    return polygon;
  }
}

/**
 * Export QR code eye shapes.
 */
export const QrEyeShape = {
  Square: SquareEyeShape,
  Circle: CircleEyeShape,
  Rhombus: RhombusEyeShape,
};
