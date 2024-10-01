interface IQrColor {
    applyToElement(element: SVGElement, mainSvg: SVGElement): void;
}
declare class SameAsMatrix implements IQrColor {
    applyToElement(): void;
}
declare class Solid implements IQrColor {
    private color;
    constructor(color: string);
    applyToElement(element: SVGElement): void;
}
declare class LinearGradient implements IQrColor {
    private colors;
    private orientation;
    private gradientId;
    constructor(colors: Array<[number, string]>, orientation: GradientOrientation);
    applyToElement(element: SVGElement, mainSvg: SVGElement): void;
}
declare class GradientOrientation {
    start: [string, string];
    end: [string, string];
    constructor(start: [string, string], end: [string, string]);
    static Vertical: GradientOrientation;
    static Horizontal: GradientOrientation;
    static LeftDiagonal: GradientOrientation;
    static RightDiagonal: GradientOrientation;
}
declare class RadialGradient implements IQrColor {
    private colors;
    private radius;
    constructor(colors: Array<[number, string]>, radius?: number);
    applyToElement(element: SVGElement, mainSvg: SVGElement): void;
}
declare class SweepGradient implements IQrColor {
    private colors;
    constructor(colors: Array<[number, string]>);
    applyToElement(element: SVGElement, mainSvg: SVGElement): void;
}
declare const QrColor: {
    Solid: typeof Solid;
    LinearGradient: typeof LinearGradient;
    RadialGradient: typeof RadialGradient;
    SweepGradient: typeof SweepGradient;
    SameAsMatrix: SameAsMatrix;
};
export type { IQrColor };
export { QrColor, GradientOrientation };
