import type { QrCodedText } from "./QrCodedText";

export enum PixelType {
  DarkPixel = "DarkPixel",
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
  static fromQrMatrix(byteMatrix: QrCodedText): QrCodeMatrix {
    const { size } = byteMatrix;
    const qrMatrix = new QrCodeMatrix(size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const value = byteMatrix.getModule(i, j);
        qrMatrix.set(i, j, value ? PixelType.DarkPixel : PixelType.Background);
      }
    }
    return qrMatrix;
  }
}
