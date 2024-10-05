import { QrCodeMatrix, PixelType } from "../../encode/QrCodeMatrix";
import { eyeFrameSize } from "./QrEyeFrameShape";

/**
 * Interface representing the QR code shape.
 */
export interface IQrShape {
  qrOriginStart: [number, number];

  /**
   * Transforms or expands the pixel matrix of the QR code.
   * Throws an error if the matrix is reduced.
   */
  apply(matrix: QrCodeMatrix): QrCodeMatrix;

  /**
   * Checks if a pixel is within the shape of the QR code.
   */
  pixelInShape(i: number, j: number, modifiedByteMatrix: QrCodeMatrix): boolean;
}

/**
 * Square QR code shape
 */
export class Square implements IQrShape {
  qrOriginStart: [number, number] = [0, 0];

  apply(matrix: QrCodeMatrix): QrCodeMatrix {
    return matrix;
  }

  pixelInShape(): boolean {
    return true;
  }
}

/**
 * Circular QR code shape with random dark/light pixels around the circle.
 */
export class Circle implements IQrShape {
  private random: Random;
  private addedPoints: Set<string>;
  public qrOriginStart: [number, number];

  constructor(seed: number = 233) {
    this.random = new Random(seed);
    this.addedPoints = new Set();
    this.qrOriginStart = [0, 0];
  }

  apply(matrix: QrCodeMatrix): QrCodeMatrix {
    const added = Math.round((matrix.size * Math.sqrt(2) - matrix.size) / 2);
    const newSize = matrix.size + 2 * added;
    const newMatrix = new QrCodeMatrix(newSize);
    const center = newSize / 2;
    this.qrOriginStart = [center - matrix.size / 2, center - matrix.size / 2];

    // Fill surrounding area with random pixels forming a circular shape
    this.fillCircularPixels(newMatrix, matrix, added, center, newSize);

    // Copy the original matrix into the new one
    this.copyOriginalMatrix(matrix, newMatrix, added);

    return newMatrix;
  }

  pixelInShape(i: number, j: number): boolean {
    return this.addedPoints.has(`${i},${j}`);
  }

  private fillCircularPixels(
    newMatrix: QrCodeMatrix,
    matrix: QrCodeMatrix,
    added: number,
    center: number,
    newSize: number,
  ) {
    for (let i = 0; i < newSize; i++) {
      for (let j = 0; j < newSize; j++) {
        if (
          this.isInCircularArea(i, j, center, matrix.size, added) &&
          !this.isAdjacentToEyeFrame(
            i,
            j,
            eyeFrameSize,
            newSize,
            this.qrOriginStart,
          )
        ) {
          const isDarkPixel = this.random.nextBoolean();
          newMatrix.set(
            i,
            j,
            isDarkPixel ? PixelType.DarkPixel : PixelType.Background,
          );

          if (isDarkPixel) {
            this.addedPoints.add(`${i},${j}`);
          }
        }
      }
    }
  }

  private copyOriginalMatrix(
    matrix: QrCodeMatrix,
    newMatrix: QrCodeMatrix,
    added: number,
  ) {
    for (let i = 0; i < matrix.size; i++) {
      for (let j = 0; j < matrix.size; j++) {
        newMatrix.set(added + i, added + j, matrix.get(i, j));
      }
    }
  }

  private isInCircularArea(
    i: number,
    j: number,
    center: number,
    matrixSize: number,
    added: number,
  ): boolean {
    return (
      (i <= added - 1 ||
        j <= added - 1 ||
        i >= added + matrixSize ||
        j >= added + matrixSize) &&
      Math.sqrt(
        (center - i) * (center - i - 0.5) + (center - j) * (center - j - 0.5),
      ) <= center
    );
  }

  private isAdjacentToEyeFrame(
    i: number,
    j: number,
    eyeFrameSize: number,
    newSize: number,
    qrOriginStart: [number, number],
  ): boolean {
    const eyeFrames = [
      { x: qrOriginStart[0], y: qrOriginStart[1], sides: ["top", "left"] },
      {
        x: qrOriginStart[0],
        y: newSize - qrOriginStart[1] - eyeFrameSize,
        sides: ["bottom", "left"],
      },
      {
        x: newSize - qrOriginStart[0] - eyeFrameSize,
        y: qrOriginStart[1],
        sides: ["top", "right"],
      },
    ];

    return eyeFrames.some(({ x, y, sides }) =>
      this.isPixelAdjacentToEyeFrame(i, j, x, y, sides, eyeFrameSize),
    );
  }

  private isPixelAdjacentToEyeFrame(
    i: number,
    j: number,
    x: number,
    y: number,
    sides: string[],
    eyeFrameSize: number,
  ): boolean {
    return (
      (sides.includes("left") &&
        i === x - 1 &&
        j >= y &&
        j < y + eyeFrameSize) ||
      (sides.includes("right") &&
        i === x + eyeFrameSize &&
        j >= y &&
        j < y + eyeFrameSize) ||
      (sides.includes("top") &&
        j === y - 1 &&
        i >= x &&
        i < x + eyeFrameSize) ||
      (sides.includes("bottom") &&
        j === y + eyeFrameSize &&
        i >= x &&
        i < x + eyeFrameSize)
    );
  }
}

/**
 * Simple random generator based on seed.
 */
class Random {
  constructor(private seed: number) {}

  nextBoolean(): boolean {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x) > 0.5;
  }
}

/**
 * Available QR shapes.
 */
export const QrShape = {
  Square,
  Circle,
};
