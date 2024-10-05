import {
  QrErrorCorrectionLevel,
  type QrErrorCorrectionLevelConfig,
} from "../encode/QrCodedText";
import { QrShapes } from "./QrShapes";
import {
  createQrShapesFromConfig,
  type QrShapesConfig,
} from "./QrShapesMapper";

export interface QrOptionsConfig {
  sizeRatio?: number;
  shapes?: QrShapesConfig;
  errorCorrectionLevel?: QrErrorCorrectionLevelConfig;
}

// Represents the options of the QR code
export class QrOptions {
  sizeRatio: number;
  shapes: QrShapes;
  errorCorrectionLevel: QrErrorCorrectionLevel;

  constructor(config: QrOptionsConfig) {
    this.sizeRatio = config.sizeRatio ?? 1;
    this.shapes = config.shapes
      ? createQrShapesFromConfig(config.shapes)
      : new QrShapes(null, null, null, null, null, null, null, null);
    this.errorCorrectionLevel = config.errorCorrectionLevel
      ? QrErrorCorrectionLevel.fromString(config.errorCorrectionLevel)
      : QrErrorCorrectionLevel.HIGH;
  }
}
