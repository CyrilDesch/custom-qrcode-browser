import { getDefsElement, SVG_NS } from "../../utils/SvgUtils";
import { QrColor, type IQrColor } from "../QrColor";
import type { IQrSVGWithImage } from "../SVGInterfaces";

// Class representing a vector background for a QR code
export class QrBackground implements IQrSVGWithImage {
  constructor(
    public imageData: string | null = null,
    public sizeRatio: number = 1,
    public padding: number = 0,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  createSvgElement(mainSvg: SVGElement): SVGElement {
    const rect = this.createBaseRect();
    const defs = getDefsElement(mainSvg);

    if (this.imageData) {
      this.createPattern(this.imageData, defs, mainSvg); // No need to assign 'pattern' to a variable
      rect.setAttribute("fill", `url(#${this.imageData})`);
    } else {
      this.color.applyToElement(rect, mainSvg);
    }

    return rect;
  }

  // Create the base rectangle that covers the full QR code area
  private createBaseRect(): SVGElement {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    return rect;
  }

  // Create the pattern element if image data is provided
  private createPattern(
    imageData: string,
    defs: SVGElement,
    mainSvg: SVGElement,
  ): void {
    const pattern = document.createElementNS(SVG_NS, "pattern");
    pattern.setAttribute("id", imageData);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");
    pattern.setAttribute("width", "100%");
    pattern.setAttribute("height", "100%");

    const bgRect = this.createBaseRect();
    this.color.applyToElement(bgRect, mainSvg);

    const image = this.createImageElement(imageData);
    pattern.appendChild(bgRect);
    pattern.appendChild(image);
    defs.appendChild(pattern); // Pattern is directly appended, no need for a variable
  }

  // Create the image element for the background pattern
  private createImageElement(imageData: string): SVGElement {
    const image = document.createElementNS(SVG_NS, "image");
    image.setAttribute("href", imageData);
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("preserveAspectRatio", "xMidYMid slice");
    return image;
  }
}
