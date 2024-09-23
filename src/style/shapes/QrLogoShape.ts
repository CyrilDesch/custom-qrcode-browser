import { createSvgGroupFromElements } from "../../utils/utils";
import { QrColor, type IQrColor } from "../QrColor";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import type { IQrSVGWithImage } from "../SVGInterfaces";

interface IQrLogoShape extends IQrSVGWithImage {}
const SVG_NS = "http://www.w3.org/2000/svg";

abstract class BaseLogoShape implements IQrLogoShape {
  constructor(
    public imageData: string | null = null, // Peut être une URL ou une chaîne SVG
    public sizeRatio: number = 0.2,
    public padding: number = 1,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

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

  protected createImageElement(
    x: number,
    y: number,
    width: number,
    height: number,
    clipPathId?: string,
  ): SVGElement {
    if (!this.imageData) {
      throw new Error("Image data is not provided.");
    }

    // Vérifier si l'image est un SVG (en commençant par "<svg")
    const isSvg = this.imageData.includes("<svg");
    if (isSvg) {
      // Parser le contenu SVG fourni
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(this.imageData, "image/svg+xml");
      const svgElement = svgDoc.documentElement as unknown as SVGSVGElement;

      // Cloner l'élément SVG pour éviter les problèmes de namespace
      const importedSvg = document.importNode(svgElement, true) as SVGElement;

      importedSvg.setAttribute("width", width.toString());
      importedSvg.setAttribute("height", height.toString());
      importedSvg.setAttribute("x", x.toString());
      importedSvg.setAttribute("y", y.toString());

      // Créer un groupe pour appliquer la transformation
      const group = document.createElementNS(SVG_NS, "g");

      if (clipPathId) {
        group.setAttribute("clip-path", `url(#${clipPathId})`);
      }

      group.appendChild(importedSvg);
      return group;
    } else {
      // Traitement standard pour les images non-SVG (URL d'image)
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

      if (clipPathId) {
        img.setAttribute("clip-path", `url(#${clipPathId})`);
      }

      return img;
    }
  }

  abstract createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement;
}

/**
 * Forme carrée pour le logo.
 */
class SquareShape extends BaseLogoShape {
  createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement {
    const width = designer.qrMatrix.size;
    const height = designer.qrMatrix.size;
    const logoSize = Math.min(width, height) * this.sizeRatio;
    const x = (width - logoSize) / 2;
    const y = (height - logoSize) / 2;
    const svgElements = [];

    // Création du fond carré
    const bgRect = document.createElementNS(SVG_NS, "rect");
    bgRect.setAttribute("x", x.toString());
    bgRect.setAttribute("y", y.toString());
    bgRect.setAttribute("width", logoSize.toString());
    bgRect.setAttribute("height", logoSize.toString());
    this.color.applyToElement(bgRect, mainSvg);
    svgElements.push(bgRect);

    if (this.imageData) {
      const clipPathId = `clipSquare${Math.random().toString(36).substr(2, 9)}`;

      // Création du clipPath carré
      const defs = document.createElementNS(SVG_NS, "defs");
      const clipPath = document.createElementNS(SVG_NS, "clipPath");
      clipPath.setAttribute("id", clipPathId);

      const clipRect = document.createElementNS(SVG_NS, "rect");
      clipRect.setAttribute("x", (x + this.padding).toString());
      clipRect.setAttribute("y", (y + this.padding).toString());
      clipRect.setAttribute("width", (logoSize - 2 * this.padding).toString());
      clipRect.setAttribute("height", (logoSize - 2 * this.padding).toString());

      clipPath.appendChild(clipRect);
      defs.appendChild(clipPath);
      svgElements.push(defs);

      const imgSize = logoSize - 2 * this.padding;
      const imgX = x + this.padding;
      const imgY = y + this.padding;

      const img = this.createImageElement(
        imgX,
        imgY,
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
  }
}

/**
 * Forme circulaire pour le logo.
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
    const svgElements = [];

    this.addCircleCoordinates(cx - 0.5, cy - 0.5, radius, designer);

    // Création du fond circulaire
    const bgCircle = document.createElementNS(SVG_NS, "circle");
    bgCircle.setAttribute("cx", cx.toString());
    bgCircle.setAttribute("cy", cy.toString());
    bgCircle.setAttribute("r", radius.toString());
    this.color.applyToElement(bgCircle, mainSvg);
    svgElements.push(bgCircle);

    if (this.imageData) {
      const clipPathId = `clipCircle${Math.random().toString(36).substr(2, 9)}`;

      // Création du clipPath circulaire
      const defs = document.createElementNS(SVG_NS, "defs");
      const clipPath = document.createElementNS(SVG_NS, "clipPath");
      clipPath.setAttribute("id", clipPathId);

      const clipCircle = document.createElementNS(SVG_NS, "circle");
      clipCircle.setAttribute("cx", cx.toString());
      clipCircle.setAttribute("cy", cy.toString());
      clipCircle.setAttribute("r", (radius - this.padding).toString());

      clipPath.appendChild(clipCircle);
      defs.appendChild(clipPath);
      svgElements.push(defs);

      const imgSize = 2 * (radius - this.padding);
      const imgX = cx - (radius - this.padding);
      const imgY = cy - (radius - this.padding);

      const img = this.createImageElement(
        imgX,
        imgY,
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
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
        // Vérifier si le point (x, y) est dans le cercle
        const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (distance <= radius) {
          designer.addUsedCoordinate(x, y);
        }
      }
    }
  }
}

/**
 * Forme avec coins arrondis pour le logo.
 */
class RoundCornersShape extends BaseLogoShape {
  createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement {
    const width = designer.qrMatrix.size;
    const height = designer.qrMatrix.size;
    const logoSize = Math.min(width, height) * this.sizeRatio;
    const x = (width - logoSize) / 2;
    const y = (height - logoSize) / 2;
    const cornerRadius = logoSize * 0.1;
    const svgElements = [];

    // Création du fond à coins arrondis
    const bgRect = document.createElementNS(SVG_NS, "rect");
    bgRect.setAttribute("x", x.toString());
    bgRect.setAttribute("y", y.toString());
    bgRect.setAttribute("width", logoSize.toString());
    bgRect.setAttribute("height", logoSize.toString());
    bgRect.setAttribute("rx", cornerRadius.toString());
    bgRect.setAttribute("ry", cornerRadius.toString());
    this.color.applyToElement(bgRect, mainSvg);
    svgElements.push(bgRect);

    if (this.imageData) {
      const clipPathId = `clipRoundRect${Math.random().toString(36).substr(2, 9)}`;

      // Création du clipPath à coins arrondis
      const defs = document.createElementNS(SVG_NS, "defs");
      const clipPath = document.createElementNS(SVG_NS, "clipPath");
      clipPath.setAttribute("id", clipPathId);

      const clipRect = document.createElementNS(SVG_NS, "rect");
      clipRect.setAttribute("x", (x + this.padding).toString());
      clipRect.setAttribute("y", (y + this.padding).toString());
      clipRect.setAttribute("width", (logoSize - 2 * this.padding).toString());
      clipRect.setAttribute("height", (logoSize - 2 * this.padding).toString());
      clipRect.setAttribute("rx", cornerRadius.toString());
      clipRect.setAttribute("ry", cornerRadius.toString());

      clipPath.appendChild(clipRect);
      defs.appendChild(clipPath);
      svgElements.push(defs);

      const imgSize = logoSize - 2 * this.padding;
      const imgX = x + this.padding;
      const imgY = y + this.padding;

      const img = this.createImageElement(
        imgX,
        imgY,
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
  }
}

/**
 * Forme en losange pour le logo.
 */
class RhombusShape extends BaseLogoShape {
  createSvgElement(
    mainSvg: SVGElement,
    designer: QrShapesDesigner,
  ): SVGElement {
    const width = designer.qrMatrix.size;
    const height = designer.qrMatrix.size;
    const logoSize = Math.min(width, height) * this.sizeRatio;
    const cx = width / 2;
    const cy = height / 2;
    const halfSize = logoSize / 2;
    const svgElements = [];

    // Points du losange
    const points = [
      `${cx},${cy - halfSize}`,
      `${cx + halfSize},${cy}`,
      `${cx},${cy + halfSize}`,
      `${cx - halfSize},${cy}`,
    ].join(" ");

    // Création du fond losange
    const bgPolygon = document.createElementNS(SVG_NS, "polygon");
    bgPolygon.setAttribute("points", points);
    this.color.applyToElement(bgPolygon, mainSvg);
    svgElements.push(bgPolygon);

    if (this.imageData) {
      const clipPathId = `clipRhombus${Math.random().toString(36).substr(2, 9)}`;

      // Création du clipPath losange
      const defs = document.createElementNS(SVG_NS, "defs");
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
      svgElements.push(defs);

      const imgSize = 2 * paddingHalfSize;
      const imgX = cx - paddingHalfSize;
      const imgY = cy - paddingHalfSize;

      const img = this.createImageElement(
        imgX,
        imgY,
        imgSize,
        imgSize,
        clipPathId,
      );
      svgElements.push(img);
    }

    return createSvgGroupFromElements(svgElements);
  }
}

/**
 * Implémentations disponibles pour QrLogoShape.
 */
export const QrLogoShape = {
  Square: SquareShape,
  Circle: CircleShape,
  RoundCorners: RoundCornersShape,
  Rhombus: RhombusShape,
};

// Exports
export type { IQrLogoShape };
