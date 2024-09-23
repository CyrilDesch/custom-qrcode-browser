import { QrBackground } from "../style/shapes/QrBackground";
import { type IQrEyeFrameShape } from "../style/shapes/QrEyeFrameShape";
import { type IQrEyeShape } from "../style/shapes/QrEyeShape";
import { type IQrLogoShape } from "../style/shapes/QrLogoShape";
import {
  QrMatrixShape,
  type IQrMatrixShape,
} from "../style/shapes/QrMatrixShape";
import { QrPixelShape } from "../style/shapes/QrPixelShape";
import { QrShape, type IQrShape } from "../style/shapes/QrShape";
import { QrTimingLineShape } from "../style/shapes/QrTimingLineShape";

/**
 * Interface représentant les formes des éléments du QR code.
 */
export interface IQrShapes {
  matrix: IQrMatrixShape;
  eye: IQrEyeShape | null;
  eyeFrame: IQrEyeFrameShape | null;
  timingLine: QrTimingLineShape | null;
  logo: IQrLogoShape | null;
  background: QrBackground | null;
  qrCode: IQrShape;
}

/**
 * Classe représentant les formes des éléments du QR code.
 * Par défaut, toutes les formes sont symétriques avec des pixels et des formes par défaut.
 */
export class QrShapes implements IQrShapes {
  matrix: IQrMatrixShape;
  eye: IQrEyeShape | null;
  eyeFrame: IQrEyeFrameShape | null;
  timingLine: QrTimingLineShape | null;
  logo: IQrLogoShape | null;
  background: QrBackground | null;
  qrCode: IQrShape;

  constructor(
    matrix: IQrMatrixShape = new QrMatrixShape(new QrPixelShape.Square()),
    eye: IQrEyeShape | null = null,
    eyeFrame: IQrEyeFrameShape | null = null,
    timingLine: QrTimingLineShape | null = null,
    logo: IQrLogoShape | null = null,
    background: QrBackground | null = null,
    qrCode: IQrShape = new QrShape.Square(),
  ) {
    this.matrix = matrix;
    this.eye = eye;
    this.eyeFrame = eyeFrame;
    this.timingLine = timingLine;
    this.logo = logo;
    this.background = background;
    this.qrCode = qrCode;
  }
}
