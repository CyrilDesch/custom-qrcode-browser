import {
  LinearGradientOrientation,
  type IQrColor,
  QrColor,
  type LinearGradientOrientationConfig,
} from "../style/QrColor";
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
  pixelShape: QrPixelShapeConfig;
  color: QrColorConfig;
}

function createQrAlignmentPatternShape(
  config: QrAlignmentPatternShapeConfig,
): IQrAlignmentPatternShape {
  return new QrAlignmentPatternShape.Square(
    createQrPixelShape(config.pixelShape),
    createQrColor(config.color),
  );
}

/** --------------------------------------------------------------------------
 * QR Background configuration.
 */
export interface QrBackgroundConfig {
  image?: string;
  color?: QrColorConfig;
}

function createQrBackground(config: QrBackgroundConfig): QrBackground {
  const color = config.color ? createQrColor(config.color) : undefined;
  return new QrBackground(config.image, 1, 0, color);
}

/** --------------------------------------------------------------------------
 * QR Color configuration.
 */

export type QrColorConfig =
  | { type: "Solid"; value: string }
  | {
      type: "LinearGradient";
      colors: Array<[number, string]>;
      orientation: LinearGradientOrientationConfig;
    }
  | { type: "RadialGradient"; colors: Array<[number, string]>; radius?: number }
  | { type: "SweepGradient"; colors: Array<[number, string]> };

function createQrColor(config: QrColorConfig): IQrColor {
  switch (config.type) {
    case "LinearGradient":
      return new QrColor.LinearGradient(
        config.colors,
        LinearGradientOrientation.fromString(config.orientation),
      );
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
  pixelShape: QrPixelShapeConfig;
  color: QrColorConfig;
}

function createQrEyeFrameShape(
  config: QrEyeFrameShapeConfig,
): IQrEyeFrameShape {
  return config.type === "Circle"
    ? new QrEyeFrameShape.Circle(
        createQrPixelShape(config.pixelShape),
        createQrColor(config.color),
      )
    : new QrEyeFrameShape.Square(
        createQrPixelShape(config.pixelShape),
        createQrColor(config.color),
      );
}

/** --------------------------------------------------------------------------
 * QR EyeShape configuration.
 */
type QrEyeShapeType = "Square" | "Circle" | "Rhombus";

interface QrEyeShapeBaseConfig {
  type: QrEyeShapeType;
  color: QrColorConfig;
}

interface QrEyeShapeClassicConfig extends QrEyeShapeBaseConfig {
  type: "Circle" | "Rhombus";
}

interface QrEyeShapeRoundedConfig extends QrEyeShapeBaseConfig {
  type: "Square";
  cornerRadius?: number;
}

export type QrEyeShapeConfig =
  | QrEyeShapeClassicConfig
  | QrEyeShapeRoundedConfig;

function createQrEyeShape(config: QrEyeShapeConfig): IQrEyeShape {
  const color = createQrColor(config.color);
  switch (config.type) {
    case "Circle":
      return new QrEyeShape.Circle(3, color);
    case "Rhombus":
      return new QrEyeShape.Rhombus(3, color);
    case "Square":
      return new QrEyeShape.Square(config.cornerRadius ?? 0, 3, color);
  }
}

/** --------------------------------------------------------------------------
 * QR LogoShape configuration.
 */
export interface QrLogoShapeConfig {
  type: "Circle" | "Square" | "Rhombus" | "RoundCorners";
  image: string | null;
  sizeRatio: number;
  padding: number;
  color: QrColorConfig;
}

function createQrLogoShape(config: QrLogoShapeConfig): IQrLogoShape {
  return new QrLogoShape.Circle(
    config.image,
    config.sizeRatio,
    config.padding,
    createQrColor(config.color),
  );
}

/** --------------------------------------------------------------------------
 * QR MatrixPixelShape configuration.
 */
export interface QrMatrixPixelShapeConfig {
  pixelShape: QrPixelShapeConfig;
  color: QrColorConfig;
}

function createQrMatrixPixelShape(
  config: QrMatrixPixelShapeConfig,
): QrMatrixPixelShape {
  return new QrMatrixPixelShape(
    createQrPixelShape(config.pixelShape),
    createQrColor(config.color),
  );
}

/** --------------------------------------------------------------------------
 * QR PixelShape configuration.
 */
type QrPixelShapeType =
  | "Square"
  | "Circle"
  | "RoundCorners"
  | "StickyCorners"
  | "Rhombus"
  | "Star"
  | "RoundCornersVertical"
  | "RoundCornersHorizontal"
  | "Hexagon"
  | "Octagon";

// Discriminated union for pixel shapes
interface QrPixelShapeBase {
  type: QrPixelShapeType;
  sizeRatio?: number;
}

interface QrPixelShapeBasic extends QrPixelShapeBase {
  type: "Circle" | "Square" | "Rhombus" | "Star" | "Hexagon" | "Octagon";
}

interface QrPixelShapeWithRadius extends QrPixelShapeBase {
  type:
    | "RoundCorners"
    | "StickyCorners"
    | "RoundCornersVertical"
    | "RoundCornersHorizontal";
  cornerRadius?: number;
}

// Union of all pixel shape types
export type QrPixelShapeConfig = QrPixelShapeBasic | QrPixelShapeWithRadius;

function createQrPixelShape(config: QrPixelShapeConfig): IQrPixelShape {
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
      return new QrPixelShape.Square(config.sizeRatio);
    case "Rhombus":
      return new QrPixelShape.Rhombus(config.sizeRatio);
    case "Star":
      return new QrPixelShape.Star(config.sizeRatio);
    case "RoundCornersVertical":
      return new QrPixelShape.RoundCornersVertical(
        config.sizeRatio,
        config.cornerRadius,
      );
    case "RoundCornersHorizontal":
      return new QrPixelShape.RoundCornersHorizontal(
        config.sizeRatio,
        config.cornerRadius,
      );
    case "Hexagon":
      return new QrPixelShape.Hexagon(config.sizeRatio);
    case "Octagon":
      return new QrPixelShape.Octagon(config.sizeRatio);
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
