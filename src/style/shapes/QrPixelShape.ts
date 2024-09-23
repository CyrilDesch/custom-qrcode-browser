import type { Neighbors } from "../../utils/Neighbors";

/**
 * Interface pour définir la forme des pixels dans un QR vectoriel.
 */
interface IQrPixelShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    neighbors: Neighbors,
  ): string;
}

abstract class BaseShape implements IQrPixelShape {
  public sizeRatio: number;

  constructor(sizeRatio: number = 1) {
    this.sizeRatio = sizeRatio; // Peut également être utilisé comme ratio de rayon
  }

  abstract createSvgElement(
    x: number,
    y: number,
    size: number,
    neighbors: Neighbors,
  ): string;
}

/**
 * Forme par défaut pour le pixel (carré).
 */
class SquareShape extends BaseShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    return `M${x + offset},${y + offset} H${x + offset + fitSize} V${y + offset + fitSize} H${x + offset} Z`;
  }
}

/**
 * Forme circulaire pour le pixel.
 */
class CircleShape extends BaseShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const radius = (size / 2) * this.sizeRatio;
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    return `M${centerX},${centerY} m-${radius},0 a${radius},${radius} 0 1,0 ${2 * radius},0 a${radius},${radius} 0 1,0 -${2 * radius},0`;
  }
}

/**
 * Forme avec coins arrondis pour le pixel.
 */
class RoundCornersShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const cornerRadius = fitSize * this.cornerRadius;
    return `M${x + offset + cornerRadius},${y + offset} H${x + offset + fitSize - cornerRadius} A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset + fitSize},${y + offset + cornerRadius} V${y + offset + fitSize - cornerRadius} A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset + fitSize - cornerRadius},${y + offset + fitSize} H${x + offset + cornerRadius} A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset},${y + offset + fitSize - cornerRadius} V${y + offset + cornerRadius} A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset + cornerRadius},${y + offset} Z`;
  }
}

/**
 * Forme en losange pour le pixel.
 */
class RhombusShape extends BaseShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const halfSize = fitSize / 2;
    return `M ${x + offset + halfSize},${y + offset} L ${x + offset + fitSize},${y + offset + halfSize} L ${x + offset + halfSize},${y + offset + fitSize} L ${x + offset},${y + offset + halfSize} Z`;
  }
}

/**
 * Forme en étoile pour le pixel.
 */
class StarShape extends BaseShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const centerX = x + offset + fitSize / 2;
    const centerY = y + offset + fitSize / 2;
    const path = [];
    for (let i = 0; i < 5; i++) {
      const angle = ((i * 72 - 90) * Math.PI) / 180; // Orientation de l'étoile vers le haut
      const pointX = centerX + (fitSize / 2) * Math.cos(angle);
      const pointY = centerY + (fitSize / 2) * Math.sin(angle);
      path.push(`${pointX},${pointY}`);
    }
    return `M ${path.join(" L ")} Z`;
  }
}

/**
 * Forme avec coins arrondis verticalement pour le pixel.
 */
class RoundCornersVerticalShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const padding = fitSize * this.cornerRadius;
    return `M ${x + offset + padding},${y + offset} H ${x + offset + fitSize - padding} V ${y + offset + fitSize} H ${x + offset + padding} Z`;
  }
}

/**
 * Forme avec coins arrondis horizontalement pour le pixel.
 */
class RoundCornersHorizontalShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const padding = fitSize * this.cornerRadius;
    return `M ${x + offset},${y + offset + padding} H ${x + offset + fitSize} V ${y + offset + fitSize - padding} H ${x + offset} Z`;
  }
}

/**
 * Forme hexagonale pour le pixel.
 */
class HexagonShape extends BaseShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const halfSize = fitSize / 2;
    const quarterSize = fitSize / 4;
    return `
      M ${x + offset + quarterSize},${y + offset}
      L ${x + offset + fitSize - quarterSize},${y + offset}
      L ${x + offset + fitSize},${y + offset + halfSize}
      L ${x + offset + fitSize - quarterSize},${y + offset + fitSize}
      L ${x + offset + quarterSize},${y + offset + fitSize}
      L ${x + offset},${y + offset + halfSize}
      Z
    `;
  }
}

/**
 * Forme octogonale pour le pixel.
 */
class OctagonShape extends BaseShape {
  createSvgElement(
    x: number,
    y: number,
    size: number,
    _neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offsetXY = (size - fitSize) / 2;
    const offset = fitSize / 3; // Offset calculé pour un octogone régulier
    return `
      M ${x + offsetXY + offset},${y + offsetXY}
      L ${x + offsetXY + fitSize - offset},${y + offsetXY}
      L ${x + offsetXY + fitSize},${y + offsetXY + offset}
      L ${x + offsetXY + fitSize},${y + offsetXY + fitSize - offset}
      L ${x + offsetXY + fitSize - offset},${y + offsetXY + fitSize}
      L ${x + offsetXY + offset},${y + offsetXY + fitSize}
      L ${x + offsetXY},${y + offsetXY + fitSize - offset}
      L ${x + offsetXY},${y + offsetXY + offset}
      Z
    `;
  }
}

/**
 * Forme de pixel qui ajuste les coins en fonction des voisins.
 */
class NeighborAwareShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(
    x: number,
    y: number,
    size: number,
    neighbors: Neighbors,
  ): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const radius = fitSize * this.cornerRadius;

    // Démarrer au milieu du bord supérieur
    let path = `M${x + offset + fitSize / 2},${y + offset}`;

    // Coin en haut à droite
    if (!neighbors.top && !neighbors.right) {
      path += ` H${x + offset + fitSize - radius} A${radius},${radius} 0 0 1 ${x + offset + fitSize},${y + offset + radius}`;
    } else {
      path += ` H${x + offset + fitSize}`;
    }

    // Côté droit
    if (!neighbors.right && !neighbors.bottom) {
      path += ` V${y + offset + fitSize - radius} A${radius},${radius} 0 0 1 ${x + offset + fitSize - radius},${y + offset + fitSize}`;
    } else {
      path += ` V${y + offset + fitSize}`;
    }

    // Côté inférieur
    if (!neighbors.bottom && !neighbors.left) {
      path += ` H${x + offset + radius} A${radius},${radius} 0 0 1 ${x + offset},${y + offset + fitSize - radius}`;
    } else {
      path += ` H${x + offset}`;
    }

    // Côté gauche
    if (!neighbors.left && !neighbors.top) {
      path += ` V${y + offset + radius} A${radius},${radius} 0 0 1 ${x + offset + radius},${y + offset}`;
    } else {
      path += ` V${y + offset}`;
    }

    return path + " Z";
  }
}

/**
 * Implémentations disponibles pour QrPixelShape.
 */
export const QrPixelShape = {
  Square: SquareShape,
  Circle: CircleShape,
  RoundCorners: RoundCornersShape,
  Rhombus: RhombusShape,
  Star: StarShape,
  RoundCornersVertical: RoundCornersVerticalShape,
  RoundCornersHorizontal: RoundCornersHorizontalShape,
  NeighborAware: NeighborAwareShape,
  Hexagon: HexagonShape,
  Octagon: OctagonShape,
};

// Exports
export type { IQrPixelShape };
