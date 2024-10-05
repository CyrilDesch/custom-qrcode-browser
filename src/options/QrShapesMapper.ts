import { GradientOrientation, type IQrColor, QrColor } from "../style/QrColor";
import {
  type IQrAlignmentPatternShape,
  QrAlignmentPatternShape,
} from "../style/shapes/QrAlignmentPatternShape";
import { QrBackground } from "../style/shapes/QrBackground";
import {
  QrEyeFrameShape,
  type IQrEyeFrameShape,
} from "../style/shapes/QrEyeFrameShape";
import { QrEyeShape, type IQrEyeShape } from "../style/shapes/QrEyeShape";
import { type IQrLogoShape, QrLogoShape } from "../style/shapes/QrLogoShape";
import { QrMatrixPixelShape } from "../style/shapes/QrMatrixPixelShape";
import { type IQrPixelShape, QrPixelShape } from "../style/shapes/QrPixelShape";
import { QrShape, type IQrShape } from "../style/shapes/QrShape";
import { QrTimingLineShape } from "../style/shapes/QrTimingLineShape";
import { QrShapes } from "./QrShapes";

/** --------------------------------------------------------------------------
 * Factory shapes configuration.
 */

export interface QrShapesConfig {
  qrCode?: QrShapeConfig;
  matrixPixel?: QrMatrixPixelShapeConfig;
  eye?: QrEyeShapeConfig;
  eyeFrame?: QrEyeFrameShapeConfig;
  logo?: QrLogoShapeConfig;
  timingLine?: QrTimingLineShapeConfig;
  background?: QrBackgroundConfig;
  alignmentPattern?: QrAlignmentPatternShapeConfig;
}

export function createQrShapesFromConfig(config: QrShapesConfig): QrShapes {
  return new QrShapes(
    config.alignmentPattern
      ? createQrAlignmentPatternShape(config.alignmentPattern)
      : null,
    config.background ? createQrBackground(config.background) : null,
    config.eyeFrame ? createQrEyeFrameShape(config.eyeFrame) : null,
    config.eye ? createQrEyeShape(config.eye) : null,
    config.logo ? createQrLogoShape(config.logo) : null,
    config.matrixPixel ? createQrMatrixPixelShape(config.matrixPixel) : null,
    config.qrCode ? createQrShape(config.qrCode) : null,
    config.timingLine ? createQrTimingLineShape(config.timingLine) : null,
  );
}

/** --------------------------------------------------------------------------
 * QR AlignmentPatternShape configuration.
 */
export interface QrAlignmentPatternShapeConfig {
  type: "Square" | "Circle";
  shape: QrPixelShapeConfig;
  color: QrColorConfig;
}

export function createQrAlignmentPatternShape(
  config: QrAlignmentPatternShapeConfig,
): IQrAlignmentPatternShape {
  return new QrAlignmentPatternShape.Square(
    createQrPixelShape(config.shape),
    createQrColor(config.color),
  );
}

/** --------------------------------------------------------------------------
 * QR Background configuration.
 */
export interface QrBackgroundConfig {
  imageData?: string;
  color?: QrColorConfig;
}

export function createQrBackground(config: QrBackgroundConfig): QrBackground {
  const color = config.color ? createQrColor(config.color) : undefined;
  return new QrBackground(config.imageData, 1, 0, color);
}

/** --------------------------------------------------------------------------
 * QR Color configuration.
 */
export type QrColorType =
  | "Solid"
  | "LinearGradient"
  | "RadialGradient"
  | "SweepGradient";

export type QrColorConfig =
  | { type: "Solid"; value: string }
  | {
      type: "LinearGradient";
      colors: Array<[number, string]>;
      orientation: GradientOrientation;
    }
  | { type: "RadialGradient"; colors: Array<[number, string]>; radius?: number }
  | { type: "SweepGradient"; colors: Array<[number, string]> };

export function createQrColor(config: QrColorConfig): IQrColor {
  switch (config.type) {
    case "LinearGradient":
      return new QrColor.LinearGradient(config.colors, config.orientation);
    case "RadialGradient":
      return new QrColor.RadialGradient(config.colors, config.radius);
    case "SweepGradient":
      return new QrColor.SweepGradient(config.colors);
    case "Solid":
    default:
      return new QrColor.Solid(config.value);
  }
}

/** --------------------------------------------------------------------------
 * QR EyeFrameShape configuration.
 */
export interface QrEyeFrameShapeConfig {
  type: "Square" | "Circle";
  shape: QrPixelShapeConfig;
  color: QrColorConfig;
}

export function createQrEyeFrameShape(
  config: QrEyeFrameShapeConfig,
): IQrEyeFrameShape {
  return config.type === "Circle"
    ? new QrEyeFrameShape.Circle(
        createQrPixelShape(config.shape),
        createQrColor(config.color),
      )
    : new QrEyeFrameShape.Square(
        createQrPixelShape(config.shape),
        createQrColor(config.color),
      );
}

/** --------------------------------------------------------------------------
 * QR EyeShape configuration.
 */
export type QrEyeShapeType = "Square" | "Circle" | "Rhombus";

export interface QrEyeShapeConfig {
  type: QrEyeShapeType;
  cornerRadius?: number;
  color: QrColorConfig;
}

export function createQrEyeShape(config: QrEyeShapeConfig): IQrEyeShape {
  const color = createQrColor(config.color);
  switch (config.type) {
    case "Circle":
      return new QrEyeShape.Circle(3, color);
    case "Rhombus":
      return new QrEyeShape.Rhombus(3, color);
    case "Square":
    default:
      return new QrEyeShape.Square(config.cornerRadius ?? 0, 3, color);
  }
}

/** --------------------------------------------------------------------------
 * QR LogoShape configuration.
 */
export interface QrLogoShapeConfig {
  type: "Circle" | "Square" | "Rhombus" | "RoundCorners";
  imageData: string | null;
  sizeRatio: number;
  padding: number;
  color: QrColorConfig;
}

export function createQrLogoShape(config: QrLogoShapeConfig): IQrLogoShape {
  return new QrLogoShape.Circle(
    config.imageData,
    config.sizeRatio,
    config.padding,
    createQrColor(config.color),
  );
}

/** --------------------------------------------------------------------------
 * QR MatrixPixelShape configuration.
 */
export interface QrMatrixPixelShapeConfig {
  shape: QrPixelShapeConfig;
  color: QrColorConfig;
}

export function createQrMatrixPixelShape(
  config: QrMatrixPixelShapeConfig,
): QrMatrixPixelShape {
  return new QrMatrixPixelShape(
    createQrPixelShape(config.shape),
    createQrColor(config.color),
  );
}

/** --------------------------------------------------------------------------
 * QR PixelShape configuration.
 */
export type QrPixelShapeType =
  | "Square"
  | "Circle"
  | "RoundCorners"
  | "StickyCorners";

// Discriminated union for pixel shapes
interface QrPixelShapeBase {
  type: QrPixelShapeType;
  sizeRatio?: number;
}

interface QrPixelShapeCircle extends QrPixelShapeBase {
  type: "Circle";
}

interface QrPixelShapeSquare extends QrPixelShapeBase {
  type: "Square";
}

interface QrPixelShapeRoundCorners extends QrPixelShapeBase {
  type: "RoundCorners";
  cornerRadius: number;
}

interface QrPixelShapeStickyCorners extends QrPixelShapeBase {
  type: "StickyCorners";
  cornerRadius: number;
}

// Union of all pixel shape types
export type QrPixelShapeConfig =
  | QrPixelShapeCircle
  | QrPixelShapeSquare
  | QrPixelShapeRoundCorners
  | QrPixelShapeStickyCorners;

export function createQrPixelShape(config: QrPixelShapeConfig): IQrPixelShape {
  switch (config.type) {
    case "Circle":
      return new QrPixelShape.Circle(config.sizeRatio);
    case "RoundCorners":
      return new QrPixelShape.RoundCorners(
        config.sizeRatio,
        config.cornerRadius,
      );
    case "StickyCorners":
      return new QrPixelShape.StickyCorners(
        config.sizeRatio,
        config.cornerRadius,
      );
    case "Square":
    default:
      return new QrPixelShape.Square(config.sizeRatio);
  }
}

/** --------------------------------------------------------------------------
 * QR Shape configuration.
 */
export type QrShapeType = "Circle" | "Square";

export interface QrShapeConfig {
  type: QrShapeType;
  seed?: number;
}

export function createQrShape(config: QrShapeConfig): IQrShape {
  return config.type === "Circle"
    ? new QrShape.Circle(config.seed)
    : new QrShape.Square();
}

/** --------------------------------------------------------------------------
 * QR TimingLineShape configuration.
 */
export interface QrTimingLineShapeConfig {
  pixelShape: QrPixelShapeConfig;
  color: QrColorConfig;
}

export function createQrTimingLineShape(
  config: QrTimingLineShapeConfig,
): QrTimingLineShape {
  return new QrTimingLineShape(
    createQrPixelShape(config.pixelShape),
    createQrColor(config.color),
  );
}
