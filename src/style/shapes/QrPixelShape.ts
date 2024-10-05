import type { Neighbors } from "../../utils/Neighbors";

/**
 * Interface to define the shape of the vector QR pixels.
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
  constructor(public sizeRatio: number = 1) {}

  abstract createSvgElement(
    x: number,
    y: number,
    size: number,
    neighbors: Neighbors,
  ): string;
}

/**
 * Default square pixel shape.
 */
class SquareShape extends BaseShape {
  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    return `M${x + offset},${y + offset} H${x + offset + fitSize} V${y + offset + fitSize} H${x + offset} Z`;
  }
}

/**
 * Circular pixel shape.
 */
class CircleShape extends BaseShape {
  createSvgElement(x: number, y: number, size: number): string {
    const radius = (size / 2) * this.sizeRatio;
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    return `M${centerX},${centerY} m-${radius},0 a${radius},${radius} 0 1,0 ${2 * radius},0 a${radius},${radius} 0 1,0 -${2 * radius},0`;
  }
}

/**
 * Pixel shape with rounded corners.
 */
class RoundCornersShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const cornerRadius = fitSize * this.cornerRadius;
    return `M${x + offset + cornerRadius},${y + offset}
            H${x + offset + fitSize - cornerRadius}
            A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset + fitSize},${y + offset + cornerRadius}
            V${y + offset + fitSize - cornerRadius}
            A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset + fitSize - cornerRadius},${y + offset + fitSize}
            H${x + offset + cornerRadius}
            A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset},${y + offset + fitSize - cornerRadius}
            V${y + offset + cornerRadius}
            A${cornerRadius},${cornerRadius} 0 0 1 ${x + offset + cornerRadius},${y + offset} Z`;
  }
}

/**
 * Rhombus-shaped pixel.
 */
class RhombusShape extends BaseShape {
  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const halfSize = fitSize / 2;
    return `M ${x + offset + halfSize},${y + offset}
            L ${x + offset + fitSize},${y + offset + halfSize}
            L ${x + offset + halfSize},${y + offset + fitSize}
            L ${x + offset},${y + offset + halfSize} Z`;
  }
}

/**
 * Star-shaped pixel.
 */
class StarShape extends BaseShape {
  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const centerX = x + offset + fitSize / 2;
    const centerY = y + offset + fitSize / 2;
    const path = Array.from({ length: 5 }, (_, i) => {
      const angle = ((i * 72 - 90) * Math.PI) / 180;
      const pointX = centerX + (fitSize / 2) * Math.cos(angle);
      const pointY = centerY + (fitSize / 2) * Math.sin(angle);
      return `${pointX},${pointY}`;
    });
    return `M ${path.join(" L ")} Z`;
  }
}

/**
 * Pixel shape with vertical rounded corners.
 */
class RoundCornersVerticalShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const padding = fitSize * this.cornerRadius;
    return `M ${x + offset + padding},${y + offset}
            H ${x + offset + fitSize - padding}
            V ${y + offset + fitSize}
            H ${x + offset + padding} Z`;
  }
}

/**
 * Pixel shape with horizontal rounded corners.
 */
class RoundCornersHorizontalShape extends BaseShape {
  constructor(
    sizeRatio: number = 1,
    public cornerRadius: number = 0,
  ) {
    super(sizeRatio);
  }

  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const padding = fitSize * this.cornerRadius;
    return `M ${x + offset},${y + offset + padding}
            H ${x + offset + fitSize}
            V ${y + offset + fitSize - padding}
            H ${x + offset} Z`;
  }
}

/**
 * Hexagonal pixel shape.
 */
class HexagonShape extends BaseShape {
  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offset = (size - fitSize) / 2;
    const halfSize = fitSize / 2;
    const quarterSize = fitSize / 4;
    return `M ${x + offset + quarterSize},${y + offset}
            L ${x + offset + fitSize - quarterSize},${y + offset}
            L ${x + offset + fitSize},${y + offset + halfSize}
            L ${x + offset + fitSize - quarterSize},${y + offset + fitSize}
            L ${x + offset + quarterSize},${y + offset + fitSize}
            L ${x + offset},${y + offset + halfSize} Z`;
  }
}

/**
 * Octagonal pixel shape.
 */
class OctagonShape extends BaseShape {
  createSvgElement(x: number, y: number, size: number): string {
    const fitSize = size * this.sizeRatio;
    const offsetXY = (size - fitSize) / 2;
    const offset = fitSize / 3;
    return `M ${x + offsetXY + offset},${y + offsetXY}
            L ${x + offsetXY + fitSize - offset},${y + offsetXY}
            L ${x + offsetXY + fitSize},${y + offsetXY + offset}
            L ${x + offsetXY + fitSize},${y + offsetXY + fitSize - offset}
            L ${x + offsetXY + fitSize - offset},${y + offsetXY + fitSize}
            L ${x + offsetXY + offset},${y + offsetXY + fitSize}
            L ${x + offsetXY},${y + offsetXY + fitSize - offset}
            L ${x + offsetXY},${y + offsetXY + offset} Z`;
  }
}

/**
 * StickyCorners pixel shape adjusts corners based on neighbors and rounds them if isolated.
 */
class StickyCornersShape extends BaseShape {
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

    let path = `M${x + offset + fitSize / 2},${y + offset}`;

    // Top-right corner
    if (!neighbors.top && !neighbors.right) {
      path += ` H${x + offset + fitSize - radius}
                A${radius},${radius} 0 0 1 ${x + offset + fitSize},${y + offset + radius}`;
    } else {
      path += ` H${x + offset + fitSize}`;
    }

    // Bottom-right corner
    if (!neighbors.right && !neighbors.bottom) {
      path += ` V${y + offset + fitSize - radius}
                A${radius},${radius} 0 0 1 ${x + offset + fitSize - radius},${y + offset + fitSize}`;
    } else {
      path += ` V${y + offset + fitSize}`;
    }

    // Bottom-left corner
    if (!neighbors.bottom && !neighbors.left) {
      path += ` H${x + offset + radius}
                A${radius},${radius} 0 0 1 ${x + offset},${y + offset + fitSize - radius}`;
    } else {
      path += ` H${x + offset}`;
    }

    // Top-left corner
    if (!neighbors.left && !neighbors.top) {
      path += ` V${y + offset + radius}
                A${radius},${radius} 0 0 1 ${x + offset + radius},${y + offset}`;
    } else {
      path += ` V${y + offset}`;
    }

    return path + " Z";
  }
}

/**
 * Available implementations for QrPixelShape.
 */
export const QrPixelShape = {
  Square: SquareShape,
  Circle: CircleShape,
  RoundCorners: RoundCornersShape,
  Rhombus: RhombusShape,
  Star: StarShape,
  RoundCornersVertical: RoundCornersVerticalShape,
  RoundCornersHorizontal: RoundCornersHorizontalShape,
  StickyCorners: StickyCornersShape, // Renamed from StickyCorners
  Hexagon: HexagonShape,
  Octagon: OctagonShape,
};

// Exports
export type { IQrPixelShape };
