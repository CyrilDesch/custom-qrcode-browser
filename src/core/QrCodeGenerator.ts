import { QrCodeMatrix } from "../encode/QrCodeMatrix";
import { QrOptions, type QrOptionsConfig } from "../options/QrOptions";
import { QrShapesDesigner } from "../style/QrShapesDesigner";
import { QrCodedText } from "../encode/QrCodedText";
import type { IQrData } from "../encode/QrData";
import { computeViewBoxIncrease } from "../utils/SvgUtils";
import {
  createQrDataFromConfig,
  type QrDataConfig,
} from "../encode/QrDataMapper";

export interface QrCodeConfig {
  data: QrDataConfig;
  options?: QrOptionsConfig;
}

// Client function to init a custom QR code instance without draw it
export function QrCodeGenerator(
  svgElement: SVGSVGElement,
  config: QrCodeConfig,
): QrCodeGeneratorImpl {
  return new QrCodeGeneratorImpl(
    svgElement,
    createQrDataFromConfig(config.data),
    new QrOptions(config.options ?? {}),
  );
}

// Class that handles the QR code generation process in SVG format
class QrCodeGeneratorImpl {
  private codeMatrix: QrCodeMatrix;

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

  // Generate the SVG for the QR code and append it to the SVG element given to the constructor
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
