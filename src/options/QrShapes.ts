import type { IQrAlignmentPatternShape } from "../style/shapes/QrAlignmentPatternShape";
import { QrBackground } from "../style/shapes/QrBackground";
import { type IQrEyeFrameShape } from "../style/shapes/QrEyeFrameShape";
import { type IQrEyeShape } from "../style/shapes/QrEyeShape";
import { type IQrLogoShape } from "../style/shapes/QrLogoShape";
import {
  QrMatrixPixelShape,
  type IQrMatrixPixelShape,
} from "../style/shapes/QrMatrixPixelShape";
import { QrPixelShape } from "../style/shapes/QrPixelShape";
import { QrShape, type IQrShape } from "../style/shapes/QrShape";
import { QrTimingLineShape } from "../style/shapes/QrTimingLineShape";

// Represents the shapes of various elements in the QR code
export interface IQrShapes {
  alignmentPattern: IQrAlignmentPatternShape | null;
  background: QrBackground | null;
  eyeFrame: IQrEyeFrameShape | null;
  eye: IQrEyeShape | null;
  logo: IQrLogoShape | null;
  matrixPixel: IQrMatrixPixelShape;
  qrCode: IQrShape;
  timingLine: QrTimingLineShape | null;
}

// Class representing the shapes of QR code elements with default symmetrical shapes
export class QrShapes implements IQrShapes {
  matrixPixel: IQrMatrixPixelShape;
  qrCode: IQrShape;
  constructor(
    public alignmentPattern: IQrAlignmentPatternShape | null = null,
    public background: QrBackground | null = null,
    public eyeFrame: IQrEyeFrameShape | null = null,
    public eye: IQrEyeShape | null = null,
    public logo: IQrLogoShape | null = null,
    matrixPixel: IQrMatrixPixelShape | null,
    qrCode: IQrShape | null,
    public timingLine: QrTimingLineShape | null = null,
  ) {
    this.matrixPixel =
      matrixPixel ?? new QrMatrixPixelShape(new QrPixelShape.Square());
    this.qrCode = qrCode ?? new QrShape.Square();
  }
}
