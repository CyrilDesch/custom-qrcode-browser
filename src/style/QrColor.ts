import { getDefsElement } from "../utils/SvgUtils";

/**
 * Interface representing a QR vector color for SVG.
 */
interface IQrColor {
  applyToElement(element: SVGElement, mainSvg: SVGElement): void;
}

/**
 * Solid color class.
 */
class Solid implements IQrColor {
  constructor(private color: string) {}

  applyToElement(element: SVGElement): void {
    element.setAttribute("fill", this.color);
  }
}

/**
 * Linear gradient class for SVG.
 */
class LinearGradient implements IQrColor {
  private gradientId = `gradient-linear-${Math.random().toString(36).slice(2, 11)}`;

  constructor(
    private colors: Array<[number, string]>,
    private orientation: LinearGradientOrientation,
  ) {}

  applyToElement(element: SVGElement, mainSvg: SVGElement): void {
    const defs = getDefsElement(mainSvg);
    if (!defs.querySelector(`#${this.gradientId}`)) {
      const gradientElement = this.createGradientElement();
      this.colors.forEach(([offset, color]) =>
        this.appendStopElement(gradientElement, offset, color),
      );
      defs.appendChild(gradientElement);
    }
    element.setAttribute("fill", `url(#${this.gradientId})`);
  }

  private createGradientElement() {
    const { start, end } = this.orientation;
    const gradientElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient",
    );
    gradientElement.setAttribute("id", this.gradientId);
    gradientElement.setAttribute("gradientUnits", "userSpaceOnUse");
    gradientElement.setAttribute("x1", start[0].toString());
    gradientElement.setAttribute("y1", start[1].toString());
    gradientElement.setAttribute("x2", end[0].toString());
    gradientElement.setAttribute("y2", end[1].toString());
    return gradientElement;
  }

  private appendStopElement(
    gradientElement: SVGElement,
    offset: number,
    color: string,
  ) {
    const stopElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop",
    );
    stopElement.setAttribute("offset", `${offset * 100}%`);
    stopElement.setAttribute("stop-color", color);
    gradientElement.appendChild(stopElement);
  }
}

/**
 * Radial gradient class for SVG.
 */
class RadialGradient implements IQrColor {
  private gradientId = `gradient-radial-${Math.random().toString(36).slice(2, 11)}`;

  constructor(
    private colors: Array<[number, string]>,
    private radius: number = Math.sqrt(2),
  ) {}

  applyToElement(element: SVGElement, mainSvg: SVGElement): void {
    const defs = getDefsElement(mainSvg);
    const gradientElement = this.createGradientElement();
    this.colors.forEach(([offset, color]) =>
      this.appendStopElement(gradientElement, offset, color),
    );
    defs.appendChild(gradientElement);
    element.setAttribute("fill", `url(#${this.gradientId})`);
  }

  private createGradientElement() {
    const gradientElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "radialGradient",
    );
    gradientElement.setAttribute("id", this.gradientId);
    gradientElement.setAttribute("cx", "0.5");
    gradientElement.setAttribute("cy", "0.5");
    gradientElement.setAttribute("r", `${this.radius * 50}%`);
    return gradientElement;
  }

  private appendStopElement(
    gradientElement: SVGElement,
    offset: number,
    color: string,
  ) {
    const stopElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop",
    );
    stopElement.setAttribute("offset", `${offset * 100}%`);
    stopElement.setAttribute("stop-color", color);
    gradientElement.appendChild(stopElement);
  }
}

/**
 * Sweep (circular) gradient class for SVG.
 */
class SweepGradient implements IQrColor {
  private gradientId = `gradient-sweep-${Math.random().toString(36).slice(2, 11)}`;

  constructor(private colors: Array<[number, string]>) {}

  applyToElement(element: SVGElement, mainSvg: SVGElement): void {
    const defs = getDefsElement(mainSvg);
    const gradientElement = this.createGradientElement();
    this.colors.forEach(([offset, color]) =>
      this.appendStopElement(gradientElement, offset, color),
    );
    defs.appendChild(gradientElement);
    element.setAttribute("fill", `url(#${this.gradientId})`);
  }

  private createGradientElement() {
    const gradientElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "radialGradient",
    );
    gradientElement.setAttribute("id", this.gradientId);
    gradientElement.setAttribute("cx", "0.5");
    gradientElement.setAttribute("cy", "0.5");
    gradientElement.setAttribute("r", "0.5");
    return gradientElement;
  }

  private appendStopElement(
    gradientElement: SVGElement,
    offset: number,
    color: string,
  ) {
    const stopElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop",
    );
    stopElement.setAttribute("offset", `${offset * 100}%`);
    stopElement.setAttribute("stop-color", color);
    gradientElement.appendChild(stopElement);
  }
}

class LinearGradientOrientation {
  constructor(
    public start: [string, string],
    public end: [string, string],
  ) {}

  static Vertical = new LinearGradientOrientation(
    ["50%", "0%"],
    ["50%", "100%"],
  );
  static Horizontal = new LinearGradientOrientation(
    ["0%", "50%"],
    ["100%", "50%"],
  );
  static LeftDiagonal = new LinearGradientOrientation(
    ["0%", "0%"],
    ["100%", "100%"],
  );
  static RightDiagonal = new LinearGradientOrientation(
    ["100%", "0%"],
    ["0%", "100%"],
  );
}

const QrColor = {
  Solid,
  LinearGradient,
  RadialGradient,
  SweepGradient,
};

// Exports
export type { IQrColor };
export { QrColor, LinearGradientOrientation as GradientOrientation };
