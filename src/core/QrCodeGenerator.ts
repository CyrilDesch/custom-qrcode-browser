import { type QrData } from "../encoder/QrData";
import { QrCodeMatrix, toQrMatrix } from "../encoder/QrCodeMatrix";
import { QrOptions, QrOptionsBuilder } from "../options/QrOptions";
import { QrShapesDesigner } from "../style/QrShapesDesigner";
import { QrCode } from "../encoder/QrEncoder";

/**
 * Fonction principale pour créer un QR code en SVG
 * @param svgElement - Élément SVG dans lequel dessiner le QR code
 * @param data - Données à encoder dans le QR code
 * @param options - Options du QR code vectoriel (QrOptions)
 * @param charset - Charset pour encoder les données (facultatif)
 * @returns Un objet QrCodeGeneratorImpl pour générer le QR code en SVG
 */
export function QrCodeGenerator(
  svgElement: SVGSVGElement,
  data: QrData,
  options: QrOptions = new QrOptionsBuilder().build(),
): QrCodeGeneratorImpl {
  return new QrCodeGeneratorImpl(svgElement, data, options);
}

class QrCodeGeneratorImpl {
  private svg: SVGSVGElement;
  private codeMatrix: QrCodeMatrix;

  constructor(
    svgElement: SVGSVGElement,
    data: QrData,
    private options: QrOptions,
  ) {
    this.svg = svgElement;

    QrCode.encodeSegments;
    const code = QrCode.encodeText(
      data.encode(),
      options.errorCorrectionLevel.lvl,
    );

    this.codeMatrix = options.shapes.qrCode.apply(toQrMatrix(code));
  }

  public generateSvg(): void {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }

    // Définir la vue SVG pour s'adapter à la taille du QR code
    const fitSize =
      this.codeMatrix.size + this.options.sizeRatio * this.codeMatrix.size;
    this.svg.setAttribute("viewBox", `0 0 ${fitSize} ${fitSize}`);
    this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    new QrShapesDesigner(this.codeMatrix, this.options, this.svg).drawSvg();
  }
}
