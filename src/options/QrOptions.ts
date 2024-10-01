import { QrErrorCorrectionLevel } from "./QrErrorCorrectionLevel";
import { QrShapes } from "./QrShapes";

/**
 * Représentation des options pour un QR code vectoriel.
 */
export class QrOptions {
  sizeRatio: number;
  shapes: QrShapes;
  errorCorrectionLevel: QrErrorCorrectionLevel;

  constructor(
    sizeRatio: number,
    shapes: QrShapes,
    errorCorrectionLevel: QrErrorCorrectionLevel,
  ) {
    this.sizeRatio = sizeRatio;
    this.shapes = shapes;
    this.errorCorrectionLevel = errorCorrectionLevel;
  }
}

/**
 * Builder pour créer une instance de `QrOptions`.
 */
export class QrOptionsBuilder {
  public sizeRatio: number = 1;
  public shapes: QrShapes = new QrShapes();
  public errorCorrectionLevel: QrErrorCorrectionLevel =
    QrErrorCorrectionLevel.Low;

  setSizeRatio(sizeRatio: number): QrOptionsBuilder {
    this.sizeRatio = 1 - sizeRatio;
    return this;
  }

  setShapes(shapes: QrShapes): QrOptionsBuilder {
    this.shapes = shapes;
    return this;
  }

  setErrorCorrectionLevel(
    errorCorrectionLevel: QrErrorCorrectionLevel,
  ): QrOptionsBuilder {
    this.errorCorrectionLevel = errorCorrectionLevel;
    return this;
  }

  build(): QrOptions {
    return new QrOptions(
      this.sizeRatio,
      this.shapes,
      this.errorCorrectionLevel,
    );
  }
}
