export function pairCombinations(array: Int32Array): Array<[number, number]> {
  const result: Array<[number, number]> = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      result.push([array[i] as number, array[j] as number]);
    }
  }

  return result;
}

export const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Crée un élément `<path>` SVG à partir d'une chaîne de caractères de données de chemin.
 */
export function createSvgPathFromString(pathData: string): SVGPathElement {
  const pathElement = document.createElementNS(SVG_NS, "path");
  pathElement.setAttribute("d", pathData);
  return pathElement;
}

export function createSvgGroupFromElements(
  elements: SVGElement[],
): SVGGElement {
  const groupElement = document.createElementNS(SVG_NS, "g");
  for (const element of elements) {
    groupElement.appendChild(element);
  }
  return groupElement;
}

export function getDefsElement(mainSvg: SVGElement): SVGDefsElement {
  let defs = mainSvg.querySelector("defs");
  if (defs === null) {
    defs = document.createElementNS(SVG_NS, "defs");
    mainSvg.insertBefore(defs, mainSvg.firstChild);
  }
  return defs;
}

export type FirstConstructorParam<
  T extends abstract new (...args: unknown[]) => unknown,
> = ConstructorParameters<T>[0];
