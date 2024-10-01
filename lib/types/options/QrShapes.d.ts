import type { IQrAlignmentPatternShape } from "../style/shapes/QrAlignmentPattern";
import { QrBackground } from "../style/shapes/QrBackground";
import { type IQrEyeFrameShape } from "../style/shapes/QrEyeFrameShape";
import { type IQrEyeShape } from "../style/shapes/QrEyeShape";
import { type IQrLogoShape } from "../style/shapes/QrLogoShape";
import { type IQrMatrixShape } from "../style/shapes/QrMatrixShape";
import { type IQrShape } from "../style/shapes/QrShape";
import { QrTimingLineShape } from "../style/shapes/QrTimingLineShape";
export interface IQrShapes {
    matrix: IQrMatrixShape;
    eye: IQrEyeShape | null;
    eyeFrame: IQrEyeFrameShape | null;
    timingLine: QrTimingLineShape | null;
    logo: IQrLogoShape | null;
    background: QrBackground | null;
    qrCode: IQrShape;
    alignmentPattern: IQrAlignmentPatternShape | null;
}
export declare class QrShapes implements IQrShapes {
    matrix: IQrMatrixShape;
    eye: IQrEyeShape | null;
    eyeFrame: IQrEyeFrameShape | null;
    timingLine: QrTimingLineShape | null;
    logo: IQrLogoShape | null;
    background: QrBackground | null;
    qrCode: IQrShape;
    alignmentPattern: IQrAlignmentPatternShape | null;
    constructor(matrix?: IQrMatrixShape, eye?: IQrEyeShape | null, eyeFrame?: IQrEyeFrameShape | null, timingLine?: QrTimingLineShape | null, logo?: IQrLogoShape | null, background?: QrBackground | null, qrCode?: IQrShape, alignmentPattern?: IQrAlignmentPatternShape | null);
}
