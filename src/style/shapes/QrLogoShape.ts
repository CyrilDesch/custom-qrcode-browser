import {
  createSvgGroupFromElements,
  getDefsElement,
} from "../../utils/SvgUtils";
import { QrColor, type IQrColor } from "../QrColor";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import type { IQrSVGWithImage } from "../SVGInterfaces";

interface IQrLogoShape extends IQrSVGWithImage {}
const SVG_NS = "http://www.w3.org/2000/svg";

abstract class BaseLogoShape implements IQrLogoShape {
  constructor(
    public imageData: string | null = null, // Can be an URL or an SVG string
    public sizeRatio: number = 0.2,
    public padding: number = 1,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  // Adds the logo's coordinates to the designer grid
  protected addLogoCoordinates(
    x: number,
    y: number,
    width: number,
    height: number,
    designer: QrShapesDesigner,
  ) {
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        designer.addUsedCoordinate(i, j);
      }
    }
  }

  // Creates the image element (either SVG or regular image)
  protected createImageElement(
    x: number,
    y: number,
    width: number,
    height: number,
    clipPathId?: string,
  ): SVGElement {
    if (!this.imageData) throw new Error("Image data is not provided.");

    const isSvg = this.imageData.includes("<svg");
    if (isSvg) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(this.imageData, "image/svg+xml");
      const importedSvg = document.importNode(svgDoc.documentElement, true);

      importedSvg.setAttribute("width", width.toString());
      importedSvg.setAttribute("height", height.toString());
      importedSvg.setAttribute("x", x.toString());
      importedSvg.setAttribute("y", y.toString());

      const group = document.createElementNS(SVG_NS, "g");
      if (clipPathId) group.setAttribute("clip-path", `url(#${clipPathId})`);
      group.appendChild(importedSvg);
      return group;
    } else {
      const img = document.createElementNS(SVG_NS, "image");
      img.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "href",
        this.imageData || "",
      );
      img.setAttribute("x", x.toString());
      img.setAttribute("y", y.toString());
      img.setAttribute("width", width.toString());
      img.setAttribute("height", height.toString());
      if (clipPathId) img.setAttribute("clip-path", `url(#${clipPathId})`);
      return img;
    }
  }

  abstract createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement;
}

/**
 * Square or rounded corner logo shape, depending on the cornerRadius.
 */
class SquareShape extends BaseLogoShape {
  constructor(
    imageData: string | null,
    sizeRatio: number,
    padding: number,
    color: IQrColor,
    public cornerRadius: number = 0, // Set cornerRadius to 0 for a sharp square
  ) {
    super(imageData, sizeRatio, padding, color);
  }

  createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement {
    const logoSize = designer.qrMatrix.size * this.sizeRatio;
    const x = (designer.qrMatrix.size - logoSize) / 2;
    const y = (designer.qrMatrix.size - logoSize) / 2;
    const svgElements: SVGElement[] = [];

    this.addLogoCoordinates(
      Math.round(x),
      Math.round(y),
      logoSize,
      logoSize,
      designer,
    );

    // Create the background with optional rounded corners
    const bgRect = document.createElementNS(SVG_NS, "rect");
    bgRect.setAttribute("x", x.toString());
    bgRect.setAttribute("y", y.toString());
    bgRect.setAttribute("width", logoSize.toString());
    bgRect.setAttribute("height", logoSize.toString());
    if (this.cornerRadius > 0) {
      bgRect.setAttribute("rx", this.cornerRadius.toString());
      bgRect.setAttribute("ry", this.cornerRadius.toString());
    }
    this.color.applyToElement(bgRect, mainSvg);
    svgElements.push(bgRect);

    // Handle image data inside the shape
    if (this.imageData) {
      const clipPathId = `clipSquare${Math.random().toString(36).substr(2, 9)}`;
      this.createClipPath(mainSvg, x, y, logoSize, clipPathId);

      const imgSize = logoSize - 2 * this.padding;
      const img = this.createImageElement(
        x + this.padding,
        y + this.padding,
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
  }

  private createClipPath(
    mainSvg: SVGElement,
    x: number,
    y: number,
    size: number,
    clipPathId: string,
  ) {
    const defs = getDefsElement(mainSvg);
    const clipPath = document.createElementNS(SVG_NS, "clipPath");
    clipPath.setAttribute("id", clipPathId);

    const clipRect = document.createElementNS(SVG_NS, "rect");
    clipRect.setAttribute("x", (x + this.padding).toString());
    clipRect.setAttribute("y", (y + this.padding).toString());
    clipRect.setAttribute("width", (size - 2 * this.padding).toString());
    clipRect.setAttribute("height", (size - 2 * this.padding).toString());
    if (this.cornerRadius > 0) {
      clipRect.setAttribute("rx", this.cornerRadius.toString());
      clipRect.setAttribute("ry", this.cornerRadius.toString());
    }

    clipPath.appendChild(clipRect);
    defs.appendChild(clipPath);
  }
}

/**
 * Circular logo shape.
 */
class CircleShape extends BaseLogoShape {
  createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement {
    const width = designer.qrMatrix.size;
    const height = designer.qrMatrix.size;
    const logoSize = Math.min(width, height) * this.sizeRatio;
    const cx = width / 2;
    const cy = height / 2;
    const radius = logoSize / 2;
    const svgElements: SVGElement[] = [];

    this.addCircleCoordinates(cx - 0.5, cy - 0.5, radius, designer);

    // Create the circular background
    const bgCircle = document.createElementNS(SVG_NS, "circle");
    bgCircle.setAttribute("cx", cx.toString());
    bgCircle.setAttribute("cy", cy.toString());
    bgCircle.setAttribute("r", radius.toString());
    this.color.applyToElement(bgCircle, mainSvg);
    svgElements.push(bgCircle);

    // Handle image data inside the circle
    if (this.imageData) {
      const clipPathId = `clipCircle${Math.random().toString(36).substr(2, 9)}`;
      this.createClipPath(mainSvg, cx, cy, radius, clipPathId);

      const imgSize = 2 * (radius - this.padding);
      const img = this.createImageElement(
        cx - (radius - this.padding),
        cy - (radius - this.padding),
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
  }

  private createClipPath(
    mainSvg: SVGElement,
    cx: number,
    cy: number,
    radius: number,
    clipPathId: string,
  ) {
    const defs = getDefsElement(mainSvg);
    const clipPath = document.createElementNS(SVG_NS, "clipPath");
    clipPath.setAttribute("id", clipPathId);

    const clipCircle = document.createElementNS(SVG_NS, "circle");
    clipCircle.setAttribute("cx", cx.toString());
    clipCircle.setAttribute("cy", cy.toString());
    clipCircle.setAttribute("r", (radius - this.padding).toString());

    clipPath.appendChild(clipCircle);
    defs.appendChild(clipPath);
  }

  private addCircleCoordinates(
    cx: number,
    cy: number,
    radius: number,
    designer: QrShapesDesigner,
  ) {
    const minX = Math.floor(cx - radius);
    const maxX = Math.ceil(cx + radius);
    const minY = Math.floor(cy - radius);
    const maxY = Math.ceil(cy + radius);

    for (let x = minX; x < maxX; x++) {
      for (let y = minY; y < maxY; y++) {
        const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (distance <= radius) designer.addUsedCoordinate(x, y);
      }
    }
  }
}

/**
 * Rhombus-shaped logo.
 */
class RhombusShape extends BaseLogoShape {
  createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement {
    const logoSize = designer.qrMatrix.size * this.sizeRatio;
    const cx = designer.qrMatrix.size / 2;
    const cy = designer.qrMatrix.size / 2;
    const halfSize = logoSize / 2;
    const svgElements: SVGElement[] = [];

    this.addRhombusLogoCoordinates(cx - 0.5, cy - 0.5, halfSize, designer);

    const points = [
      `${cx},${cy - halfSize}`,
      `${cx + halfSize},${cy}`,
      `${cx},${cy + halfSize}`,
      `${cx - halfSize},${cy}`,
    ].join(" ");

    const bgPolygon = document.createElementNS(SVG_NS, "polygon");
    bgPolygon.setAttribute("points", points);
    this.color.applyToElement(bgPolygon, mainSvg);
    svgElements.push(bgPolygon);

    if (this.imageData) {
      const clipPathId = `clipRhombus${Math.random().toString(36).substr(2, 9)}`;
      this.createClipPath(mainSvg, cx, cy, halfSize, clipPathId);

      const imgSize = 2 * (halfSize - this.padding);
      const img = this.createImageElement(
        cx - (halfSize - this.padding),
        cy - (halfSize - this.padding),
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
  }

  private createClipPath(
    mainSvg: SVGElement,
    cx: number,
    cy: number,
    halfSize: number,
    clipPathId: string,
  ) {
    const defs = getDefsElement(mainSvg);
    const clipPath = document.createElementNS(SVG_NS, "clipPath");
    clipPath.setAttribute("id", clipPathId);

    const paddingHalfSize = halfSize - this.padding;
    const clipPoints = [
      `${cx},${cy - paddingHalfSize}`,
      `${cx + paddingHalfSize},${cy}`,
      `${cx},${cy + paddingHalfSize}`,
      `${cx - paddingHalfSize},${cy}`,
    ].join(" ");

    const clipPolygon = document.createElementNS(SVG_NS, "polygon");
    clipPolygon.setAttribute("points", clipPoints);

    clipPath.appendChild(clipPolygon);
    defs.appendChild(clipPath);
  }

  private addRhombusLogoCoordinates(
    cx: number,
    cy: number,
    halfSize: number,
    designer: QrShapesDesigner,
  ) {
    const minX = Math.floor(cx - halfSize);
    const maxX = Math.ceil(cx + halfSize);
    const minY = Math.floor(cy - halfSize);
    const maxY = Math.ceil(cy + halfSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const dx = Math.abs(x - cx) / halfSize;
        const dy = Math.abs(y - cy) / halfSize;
        if (dx + dy <= 1) designer.addUsedCoordinate(x, y);
      }
    }
  }
}

export const QrLogoShape = {
  Square: SquareShape,
  Circle: CircleShape,
  Rhombus: RhombusShape,
};

export type { IQrLogoShape };
