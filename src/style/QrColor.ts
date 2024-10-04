import { getDefsElement } from "../utils/SvgUtils";

/**
 * Interface représentant une couleur vectorielle QR pour SVG.
 */
interface IQrColor {
  applyToElement(element: SVGElement, mainSvg: SVGElement): void;
}

class SameAsMatrix implements IQrColor {
  applyToElement(): void {
    // Do nothing
  }
}
const SameAsMatrixInstance = new SameAsMatrix();

/**
 * Couleur unie.
 */
class Solid implements IQrColor {
  private color: string;

  constructor(color: string) {
    this.color = color;
  }

  applyToElement(element: SVGElement): void {
    element.setAttribute("fill", this.color);
  }
}

/**
 * Gradient linéaire pour SVG.
 */
class LinearGradient implements IQrColor {
  private colors: Array<[number, string]>;
  private orientation: GradientOrientation;
  private gradientId: string;

  constructor(
    colors: Array<[number, string]>,
    orientation: GradientOrientation,
  ) {
    this.colors = colors;
    this.orientation = orientation;
    this.gradientId = `gradient-linear-${Math.random().toString(36).slice(2, 11)}`;
  }

  applyToElement(element: SVGElement, mainSvg: SVGElement): void {
    const defs = getDefsElement(mainSvg);
    if (defs.querySelector(`#${this.gradientId}`) === null) {
      // Créer le gradient linéaire
      const gradientElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient",
      );
      gradientElement.setAttribute("id", this.gradientId);
      gradientElement.setAttribute("gradientUnits", "userSpaceOnUse");
      gradientElement.setAttribute("x1", this.orientation.start[0].toString());
      gradientElement.setAttribute("y1", this.orientation.start[1].toString());
      gradientElement.setAttribute("x2", this.orientation.end[0].toString());
      gradientElement.setAttribute("y2", this.orientation.end[1].toString());

      // Ajouter les couleurs (les arrêts) au gradient
      this.colors.forEach(([offset, color]) => {
        const stopElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop",
        );
        stopElement.setAttribute("offset", `${offset * 100}%`);
        stopElement.setAttribute("stop-color", color);
        gradientElement.appendChild(stopElement);
      });

      // Ajouter le gradient dans la balise <defs>
      defs.appendChild(gradientElement);
    }

    // Appliquer le gradient au path
    element.setAttribute("fill", `url(#${this.gradientId})`);
  }
}

/**
 * Orientation pour les dégradés linéaires.
 */
class GradientOrientation {
  constructor(
    public start: [string, string],
    public end: [string, string],
  ) {}

  static Vertical = new GradientOrientation(["50%", "0%"], ["50%", "100%"]);
  static Horizontal = new GradientOrientation(["0%", "50%"], ["100%", "50%"]);
  static LeftDiagonal = new GradientOrientation(["0%", "0%"], ["100%", "100%"]);
  static RightDiagonal = new GradientOrientation(
    ["100%", "0%"],
    ["0%", "100%"],
  );
}

/**
 * Gradient radial pour SVG.
 */
class RadialGradient implements IQrColor {
  private colors: Array<[number, string]>;
  private radius: number;

  constructor(colors: Array<[number, string]>, radius: number = Math.sqrt(2)) {
    this.colors = colors;
    this.radius = radius;
  }

  applyToElement(element: SVGElement, mainSvg: SVGElement): void {
    const gradientId = `gradient-radial-${Math.random().toString(36).slice(2, 11)}`;

    const defs = getDefsElement(mainSvg);

    // Create the radial gradient
    const gradientElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "radialGradient",
    );
    gradientElement.setAttribute("id", gradientId);
    gradientElement.setAttribute("cx", "0.5");
    gradientElement.setAttribute("cy", "0.5");
    gradientElement.setAttribute("r", `${this.radius * 50}%`);

    // Add color stops
    this.colors.forEach(([offset, color]) => {
      const stopElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop",
      );
      stopElement.setAttribute("offset", `${offset * 100}%`);
      stopElement.setAttribute("stop-color", color);
      gradientElement.appendChild(stopElement);
    });

    // Append gradient to <defs>
    defs.appendChild(gradientElement);

    // Apply the gradient to the element
    element.setAttribute("fill", `url(#${gradientId})`);
  }
}

/**
 * Gradient en balayage (circulaire) pour SVG.
 */
class SweepGradient implements IQrColor {
  private colors: Array<[number, string]>;

  constructor(colors: Array<[number, string]>) {
    this.colors = colors;
  }

  applyToElement(element: SVGElement, mainSvg: SVGElement): void {
    const gradientId = `gradient-sweep-${Math.random().toString(36).slice(2, 11)}`;

    const defs = getDefsElement(mainSvg);

    // Create the radial gradient (used to simulate sweep gradient)
    const gradientElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "radialGradient",
    );
    gradientElement.setAttribute("id", gradientId);
    gradientElement.setAttribute("cx", "0.5");
    gradientElement.setAttribute("cy", "0.5");
    gradientElement.setAttribute("r", "0.5");

    // Add color stops
    this.colors.forEach(([offset, color]) => {
      const stopElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop",
      );
      stopElement.setAttribute("offset", `${offset * 100}%`);
      stopElement.setAttribute("stop-color", color);
      gradientElement.appendChild(stopElement);
    });

    // Append gradient to <defs>
    defs.appendChild(gradientElement);

    // Apply the gradient to the element
    element.setAttribute("fill", `url(#${gradientId})`);
  }
}

/**
 * Enum-like object regroupant toutes les implémentations de IQrColor.
 */
const QrColor = {
  Solid,
  LinearGradient,
  RadialGradient,
  SweepGradient,
  SameAsMatrix: SameAsMatrixInstance,
};

// Exports
export type { IQrColor };
export { QrColor, GradientOrientation };
