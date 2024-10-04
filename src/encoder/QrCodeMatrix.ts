import { Neighbors } from "../utils/Neighbors";
import type { QrCode } from "./QrEncoder";

export enum PixelType {
  DarkPixel = "DarkPixel",
  LightPixel = "LightPixel",
  Background = "Background",
}

/**
 * Represents a matrix with pixel types for QrCode.
 * The matrix is now a 2D array.
 */
export class QrCodeMatrix {
  private matrix: PixelType[][];
  public size: number;
  public origin = 0;

  constructor(size: number) {
    this.size = size;
    this.matrix = Array.from({ length: size }, () =>
      Array(size).fill(PixelType.Background),
    );
  }

  /**
   * Retrieves the pixel type at a given position (i, j).
   * Throws an error if the indices are out of bounds.
   */
  get(i: number, j: number): PixelType {
    if (this.isOutOfBounds(i, j)) {
      throw new RangeError(
        `Index (${i}, ${j}) is out of bounds for a matrix of size ${this.size}.`,
      );
    }
    return this.matrix[i]![j]!;
  }

  /**
   * Sets the pixel type at a given position (i, j).
   * Throws an error if the indices are out of bounds.
   */
  set(i: number, j: number, type: PixelType): void {
    if (this.isOutOfBounds(i, j)) {
      throw new RangeError(
        `Index (${i}, ${j}) is out of bounds for a matrix of size ${this.size}.`,
      );
    }
    this.matrix[i]![j] = type;
  }

  /**
   * Checks if the given indices are out of bounds.
   */
  isOutOfBounds(i: number, j: number): boolean {
    return i < 0 || i >= this.size || j < 0 || j >= this.size;
  }

  /**
   * Converts a byte matrix (base QrCode) into a QrCodeMatrix with pixel types.
   * Ensures that the input matrix is square.
   */
  static fromQrMatrix(byteMatrix: QrCode): QrCodeMatrix {
    const { size } = byteMatrix;
    const qrMatrix = new QrCodeMatrix(size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const value = byteMatrix.getModule(i, j);
        qrMatrix.set(i, j, value ? PixelType.DarkPixel : PixelType.LightPixel);
      }
    }
    return qrMatrix;
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
