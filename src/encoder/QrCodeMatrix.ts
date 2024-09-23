import type { QRCodeByteMatrix } from "@zxing/library";
import { Neighbors } from "../utils/Neighbors";

/**
 * Types de pixels dans le QR Code.
 */
export enum PixelType {
  DarkPixel = "DarkPixel",
  LightPixel = "LightPixel",
  Background = "Background",
}

/**
 * Représentation d'une matrice de QR code.
 */
export class QrCodeMatrix {
  public size: number;
  private types: PixelType[];
  public origin = 0;

  constructor(size: number) {
    this.size = size;
    // Initialisation du tableau avec des pixels de fond par défaut
    this.types = Array(size * size).fill(PixelType.Background);
  }

  /**
   * Récupère le type de pixel à une position donnée.
   * @param i Indice de la ligne
   * @param j Indice de la colonne
   */
  get(i: number, j: number): PixelType {
    if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
      throw new RangeError(
        `Index (${i}, ${j}) is out of bounds for a matrix of size ${this.size}.`,
      );
    }
    const pixel = this.types[i + j * this.size];
    if (pixel === undefined) {
      throw new Error(`Pixel at index (${i}, ${j}) is undefined.`);
    }
    return pixel;
  }

  /**
   * Définit un type de pixel à une position donnée.
   * @param i Indice de la ligne
   * @param j Indice de la colonne
   * @param type Type de pixel à définir
   */
  set(i: number, j: number, type: PixelType): void {
    if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
      throw new RangeError(
        `Index (${i}, ${j}) is out of bounds for a matrix of size ${this.size}.`,
      );
    }
    this.types[i + j * this.size] = type;
  }

  /**
   * Crée une copie de la matrice QR.
   */
  copy(): QrCodeMatrix {
    const matrixCopy = new QrCodeMatrix(this.size);
    matrixCopy.types = [...this.types];
    return matrixCopy;
  }
}

/**
 * Fonction qui renvoie les voisins d'une cellule dans la matrice.
 */
export function getNeighbors(
  matrix: QrCodeMatrix,
  i: number,
  j: number,
): Neighbors {
  function cmp(i2: number, j2: number): boolean {
    try {
      return matrix.get(i2, j2) === matrix.get(i, j);
    } catch {
      return false;
    }
  }

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

/**
 * Convertit une ByteMatrix en QrCodeMatrix.
 * @param byteMatrix La matrice de bytes à convertir
 * @returns Une instance de QrCodeMatrix
 * @throws Si la matrice n'est pas carrée
 */
export function toQrMatrix(byteMatrix: QRCodeByteMatrix): QrCodeMatrix {
  const width = byteMatrix.getWidth();
  const height = byteMatrix.getHeight();

  if (width !== height) {
    throw new Error("Non-square QR byte matrix");
  }

  const qrMatrix = new QrCodeMatrix(width);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const value = byteMatrix.get(i, j);
      qrMatrix.set(
        i,
        j,
        value === 1 ? PixelType.DarkPixel : PixelType.LightPixel,
      );
    }
  }

  return qrMatrix;
}
