import type { QrCodeMatrix } from "../encode/QrCodeMatrix";

/**
 * Neighbors of a pixel in the QR code matrix.
 */
export class Neighbors {
  topLeft: boolean;
  topRight: boolean;
  left: boolean;
  top: boolean;
  right: boolean;
  bottomLeft: boolean;
  bottom: boolean;
  bottomRight: boolean;

  constructor(
    top: boolean = false,
    right: boolean = false,
    bottom: boolean = false,
    left: boolean = false,
    topRight: boolean = false,
    bottomRight: boolean = false,
    bottomLeft: boolean = false,
    topLeft: boolean = false,
  ) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottomLeft = bottomLeft;
    this.bottom = bottom;
    this.bottomRight = bottomRight;
  }

  // Singleton empty
  private static emptyInstance: Neighbors | null = null;
  static get empty(): Neighbors {
    if (this.emptyInstance === null) {
      this.emptyInstance = new Neighbors();
    }
    return this.emptyInstance;
  }
}

/**
 * Retrieves the neighbors of a pixel in the QR code matrix based on the pixel type.
 */
export function getNeighbors(
  matrix: QrCodeMatrix,
  i: number,
  j: number,
): Neighbors {
  const cmp = (i2: number, j2: number): boolean => {
    return (
      !matrix.isOutOfBounds(i2, j2) && matrix.get(i2, j2) === matrix.get(i, j)
    );
  };

  return new Neighbors(
    cmp(i, j - 1), // top
    cmp(i + 1, j), // right
    cmp(i, j + 1), // bottom
    cmp(i - 1, j), // left
    cmp(i + 1, j - 1), // topRight
    cmp(i + 1, j + 1), // bottomRight
    cmp(i - 1, j + 1), // bottomLeft
    cmp(i - 1, j - 1), // topLeft
  );
}
