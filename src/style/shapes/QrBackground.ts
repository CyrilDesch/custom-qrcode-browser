import { getDefsElement, SVG_NS } from "../../utils/utils";
import { QrColor, type IQrColor } from "../QrColor";
import type { IQrSVGWithImage } from "../SVGInterfaces";

// Classe représentant un arrière-plan vectoriel pour un QR code
export class QrBackground implements IQrSVGWithImage {
  constructor(
    public imageData: string | null = null,
    public sizeRatio: number = 1,
    public padding: number = 0,
    public color: IQrColor = new QrColor.Solid("black"),
  ) {}

  createSvgElement(mainSvg: SVGElement): SVGElement {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");

    const defs = getDefsElement(mainSvg);

    if (this.imageData) {
      const pattern = document.createElementNS(SVG_NS, "pattern");
      pattern.setAttribute("id", this.imageData);
      pattern.setAttribute("patternUnits", "userSpaceOnUse");
      pattern.setAttribute("width", "100%");
      pattern.setAttribute("height", "100%");

      const bgRect = document.createElementNS(SVG_NS, "rect");
      bgRect.setAttribute("width", "100%");
      bgRect.setAttribute("height", "100%");
      this.color.applyToElement(bgRect, mainSvg);

      const image = document.createElementNS(SVG_NS, "image");
      image.setAttribute("href", this.imageData);
      image.setAttribute("x", "0");
      image.setAttribute("y", "0");
      image.setAttribute("width", "100%");
      image.setAttribute("height", "100%");
      image.setAttribute("preserveAspectRatio", "xMidYMid slice");

      pattern.appendChild(bgRect);
      pattern.appendChild(image);
      defs.appendChild(pattern);

      rect.setAttribute("fill", `url(#${this.imageData})`);
    } else {
      this.color.applyToElement(rect, mainSvg);
    }

    return rect;
  }
}
