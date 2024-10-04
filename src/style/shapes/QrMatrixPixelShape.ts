import { getNeighbors, PixelType } from "../../encoder/QrCodeMatrix";
import { createSvgPathFromString } from "../../utils/SvgUtils";
import type { IQrPixelShape } from "./QrPixelShape";
import type { IQrSVGShape } from "../SVGInterfaces";
import type { QrShapesDesigner } from "../QrShapesDesigner";
import { QrColor, type IQrColor } from "../QrColor";

/**
 * Interface pour définir la forme de la eyee interne du QR code.
 */
export interface IQrMatrixPixelShape extends IQrSVGShape {}

export class QrMatrixPixelShape implements IQrMatrixPixelShape {
  constructor(
    public pixelShape: IQrPixelShape,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  /**
   * Crée un chemin SVG pour les pixels sombres (noirs) du QR code.
   * @param x Coordonnée de départ en X
   * @param y Coordonnée de départ en Y
   * @returns Un élément SVG représentant le chemin pour les pixels sombres
   */
  createSvgElement(
    x: number,
    y: number,
    designer: QrShapesDesigner,
  ): SVGElement {
    let pathData = "";
    for (let i = x; i < designer.qrMatrix.size; i++) {
      for (let j = y; j < designer.qrMatrix.size; j++) {
        // Vérifier si le pixel est sombre et non utilisé
        if (
          designer.qrMatrix.get(i, j) === PixelType.DarkPixel &&
          !designer.isUsedCoordinate(i, j)
        ) {
          // Ajouter la coordonnée à l'ensemble des coordonnées utilisées
          designer.addUsedCoordinate(i, j);

          // Récupérer les voisins du pixel pour ajuster la forme
          const neighbors = getNeighbors(designer.qrMatrix, i, j);

          // Créer le chemin pour le pixel avec la forme de pixel choisie
          pathData += this.pixelShape.createSvgElement(i, j, 1, neighbors);
        }
      }
    }
    const svg = createSvgPathFromString(pathData);
    this.color.applyToElement(svg, designer.mainSvg);
    return svg;
  }
}
