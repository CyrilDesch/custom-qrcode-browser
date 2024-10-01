export declare function pairCombinations(array: Int32Array): Array<[number, number]>;
export declare const SVG_NS = "http://www.w3.org/2000/svg";
export declare function createSvgPathFromString(pathData: string): SVGPathElement;
export declare function createSvgGroupFromElements(elements: SVGElement[]): SVGGElement;
export declare function getDefsElement(mainSvg: SVGElement): SVGDefsElement;
export type FirstConstructorParam<T extends abstract new (...args: unknown[]) => unknown> = ConstructorParameters<T>[0];
