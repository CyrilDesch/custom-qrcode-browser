import type { Neighbors } from "../../utils/Neighbors";
interface IQrPixelShape {
    createSvgElement(x: number, y: number, size: number, neighbors: Neighbors): string;
}
declare abstract class BaseShape implements IQrPixelShape {
    sizeRatio: number;
    constructor(sizeRatio?: number);
    abstract createSvgElement(x: number, y: number, size: number, neighbors: Neighbors): string;
}
declare class SquareShape extends BaseShape {
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class CircleShape extends BaseShape {
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class RoundCornersShape extends BaseShape {
    cornerRadius: number;
    constructor(sizeRatio?: number, cornerRadius?: number);
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class RhombusShape extends BaseShape {
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class StarShape extends BaseShape {
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class RoundCornersVerticalShape extends BaseShape {
    cornerRadius: number;
    constructor(sizeRatio?: number, cornerRadius?: number);
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class RoundCornersHorizontalShape extends BaseShape {
    cornerRadius: number;
    constructor(sizeRatio?: number, cornerRadius?: number);
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class HexagonShape extends BaseShape {
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class OctagonShape extends BaseShape {
    createSvgElement(x: number, y: number, size: number, _neighbors: Neighbors): string;
}
declare class NeighborAwareShape extends BaseShape {
    cornerRadius: number;
    constructor(sizeRatio?: number, cornerRadius?: number);
    createSvgElement(x: number, y: number, size: number, neighbors: Neighbors): string;
}
export declare const QrPixelShape: {
    Square: typeof SquareShape;
    Circle: typeof CircleShape;
    RoundCorners: typeof RoundCornersShape;
    Rhombus: typeof RhombusShape;
    Star: typeof StarShape;
    RoundCornersVertical: typeof RoundCornersVerticalShape;
    RoundCornersHorizontal: typeof RoundCornersHorizontalShape;
    NeighborAware: typeof NeighborAwareShape;
    Hexagon: typeof HexagonShape;
    Octagon: typeof OctagonShape;
};
export type { IQrPixelShape };
