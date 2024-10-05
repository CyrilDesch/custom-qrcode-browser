import { QrCodeMatrix } from "../encode/QrCodeMatrix";
import { QrOptions } from "../options/QrOptions";
import { QrShapesDesigner } from "../style/QrShapesDesigner";
import { QrCodedText } from "../encode/QrCodedText";
import type { IQrData } from "../encode/QrData";
import { computeViewBoxIncrease } from "../utils/SvgUtils";

// Client function to create a custom QR code in SVG format
export function QrCodeGenerator(
  svgElement: SVGSVGElement,
  data: IQrData,
  options: QrOptions = new QrOptions({}),
): QrCodeGeneratorImpl {
  return new QrCodeGeneratorImpl(svgElement, data, options);
}

// Class that handles the QR code generation process in SVG format
class QrCodeGeneratorImpl {
  private codeMatrix: QrCodeMatrix; // Custom QR code matrix

  constructor(
    private svg: SVGSVGElement,
    data: IQrData,
    private options: QrOptions,
  ) {
    // Generate the base QR code matrix
    const code = QrCodedText.encodeText(
      data.encode(),
      options.errorCorrectionLevel,
    );
    this.codeMatrix = options.shapes.qrCode.apply(
      QrCodeMatrix.fromQrMatrix(code),
    );
  }

  public generateSvg(): void {
    this.svg.innerHTML = ""; // Clear previous content

    // Increase the viewbox size to fit the QR code
    let fitSize;
    if (this.options.sizeRatio !== 0) {
      fitSize =
        this.codeMatrix.size +
        computeViewBoxIncrease(this.codeMatrix.size, this.options.sizeRatio);
    } else {
      fitSize = 0;
    }

    this.svg.setAttribute("viewBox", `0 0 ${fitSize} ${fitSize}`);
    this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    new QrShapesDesigner(this.codeMatrix, this.options, this.svg).drawSvg();
  }
}
