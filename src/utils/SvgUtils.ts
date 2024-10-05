export const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Takes a string representing the SVG path data
 * and creates an SVG `<path>` element with the provided data.
 */
export function createSvgPathFromString(pathData: string): SVGPathElement {
  const pathElement = document.createElementNS(SVG_NS, "path");
  pathElement.setAttribute("d", pathData);
  return pathElement;
}

/**
 * Takes an array of SVG elements and creates an SVG `<g>` (group) element.
 * All provided elements are appended as children of the group element.
 */
export function createSvgGroupFromElements(
  elements: SVGElement[],
): SVGGElement {
  const groupElement = document.createElementNS(SVG_NS, "g");
  for (const element of elements) {
    groupElement.appendChild(element);
  }
  return groupElement;
}

/**
 * Retrieves the `<defs>` element from the provided SVG element.
 * If no `<defs>` element exists, it creates one and inserts it as the first child of the SVG.
 */
export function getDefsElement(mainSvg: SVGElement): SVGDefsElement {
  let defs = mainSvg.querySelector("defs");
  if (defs === null) {
    defs = document.createElementNS(SVG_NS, "defs");
    mainSvg.insertBefore(defs, mainSvg.firstChild);
  }
  return defs;
}

// Increase the viewbox size to reduce the QR code size
export function computeViewBoxIncrease(
  codeMatrixSize: number,
  sizeRatio: number,
): number {
  return codeMatrixSize * ((1 - sizeRatio) / sizeRatio);
}
