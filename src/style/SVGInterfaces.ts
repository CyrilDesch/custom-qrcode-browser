import type { QrShapesDesigner } from "./QrShapesDesigner";

export interface IQrSVGShape {
  /**
   * Crée un SVG Element pour la forme
   * @param x La position en x du début de la forme
   * @param y La position en y du début de la forme
   * @returns Un élément SVG représentant la forme
   */
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement;
}

export interface IQrSVGWithImage {
  imageData: string | null;
  sizeRatio: number; // Percentage of parent
  padding: number; // Padding between image and bg color

  /**
   * Crée un SVG Element avec l'image si elle est définie
   * @param mainSvg L'élément SVG principal
   * @param color La couleur d'arrière-plan
   * @returns Un élément SVG représentant la forme
   */
  createSvgElement(mainSvg: SVGElement, designer: QrShapesDesigner): SVGElement;
}
