import { QrCodeMatrix, PixelType } from "../../encoder/QrCodeMatrix";
import { eyeFrameSize } from "./QrEyeFrameShape";

/**
 * Interface représentant la forme du QR code.
 */
export interface IQrShape {
  qrOriginStart: [number, number];
  /**
   * Transforme la matrice de pixels du QR code ou en crée une nouvelle avec une taille plus grande.
   * Si la matrice est réduite, une erreur est lancée.
   */
  apply(matrix: QrCodeMatrix): QrCodeMatrix;

  /**
   * Détermine si un pixel est dans la forme du QR code.
   */
  pixelInShape(i: number, j: number, modifiedByteMatrix: QrCodeMatrix): boolean;
}

/**
 * Forme par défaut du QR code (sans modification).
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
 * Forme circulaire pour le QR code.
 */
export class Circle implements IQrShape {
  padding: number;
  seed: number;
  private random: Random; // Générateur aléatoire basé sur le seed
  private addedPoints: Set<string>; // Utilisé pour stocker les points ajoutés
  public qrOriginStart: [number, number];

  constructor(padding: number = 1.1, seed: number = 233) {
    this.padding = Math.max(1, Math.min(2, padding)); // Assure que le padding est entre 1 et 2
    this.seed = seed;
    this.random = new Random(seed);
    this.addedPoints = new Set<string>(); // Utilisé pour stocker les points générés aléatoirement
    this.qrOriginStart = [0, 0];
  }

  /**
   * Applique la forme circulaire à la matrice de QR code et ajoute des points aléatoires autour.
   */
  apply(matrix: QrCodeMatrix): QrCodeMatrix {
    const added = Math.round(
      (matrix.size * this.padding * Math.sqrt(2) - matrix.size) / 2,
    );
    const newSize = matrix.size + 2 * added;
    const newMatrix = new QrCodeMatrix(newSize);
    const center = newSize / 2;
    this.qrOriginStart = [center - matrix.size / 2, center - matrix.size / 2];

    // Remplissage des nouveaux pixels autour du QR code
    for (let i = 0; i < newSize; i++) {
      for (let j = 0; j < newSize; j++) {
        if (
          (i <= added - 1 ||
            j <= added - 1 ||
            i >= added + matrix.size ||
            j >= added + matrix.size) &&
          Math.sqrt(
            (center - i) * (center - i) + (center - j) * (center - j),
          ) <= center &&
          !this.isAdjacentToEyeFrame(
            i,
            j,
            eyeFrameSize,
            newSize,
            this.qrOriginStart,
          )
        ) {
          // Générer des pixels sombres ou clairs de manière aléatoire
          const isDarkPixel = this.random.nextBoolean();
          newMatrix.set(
            i,
            j,
            isDarkPixel ? PixelType.DarkPixel : PixelType.LightPixel,
          );

          // Stocker la position des points aléatoires ajoutés
          if (isDarkPixel) {
            this.addedPoints.add(`${i},${j}`);
          }
        }
      }
    }

    // Copie des pixels de la matrice originale dans la nouvelle matrice
    for (let i = 0; i < matrix.size; i++) {
      for (let j = 0; j < matrix.size; j++) {
        newMatrix.set(added + i, added + j, matrix.get(i, j));
      }
    }
    return newMatrix;
  }

  /**
   * Détermine si un pixel fait partie des points aléatoires ajoutés.
   */
  pixelInShape(i: number, j: number): boolean {
    return this.addedPoints.has(`${i},${j}`);
  }

  private isAdjacentToEyeFrame(
    i: number,
    j: number,
    eyeFrameSize: number,
    newSize: number,
    qrOriginStart: [number, number],
  ): boolean {
    const eyeFrames = [
      {
        position: { x: qrOriginStart[0], y: qrOriginStart[1] },
        sides: ["top", "left"],
      },
      {
        position: {
          x: qrOriginStart[0],
          y: newSize - qrOriginStart[1] - eyeFrameSize,
        }, // Œil bas gauche
        sides: ["bottom", "left"],
      },
      {
        position: {
          x: newSize - qrOriginStart[0] - eyeFrameSize,
          y: qrOriginStart[1],
        }, // Œil haut droit
        sides: ["top", "right"],
      },
    ];

    for (const eyeFrame of eyeFrames) {
      const { x, y } = eyeFrame.position;

      if (
        (eyeFrame.sides.includes("left") &&
          i === x - 1 &&
          j >= y &&
          j < y + eyeFrameSize) || // Ligne à gauche de l'œil
        (eyeFrame.sides.includes("right") &&
          i === x + eyeFrameSize &&
          j >= y &&
          j < y + eyeFrameSize) || // Ligne à droite de l'œil
        (eyeFrame.sides.includes("top") &&
          j === y - 1 &&
          i >= x &&
          i < x + eyeFrameSize) || // Ligne à gauche de l'œil
        (eyeFrame.sides.includes("bottom") &&
          j === y + eyeFrameSize &&
          i >= x &&
          i < x + eyeFrameSize) // Ligne à droite de l'œil
      ) {
        return true;
      }
    }
    return false;
  }
}

/**
 * Générateur aléatoire basé sur un seed.
 */
class Random {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  /**
   * Génère un booléen aléatoire en fonction du seed.
   */
  nextBoolean(): boolean {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x) > 0.5;
  }
}

export const QrShape = {
  Square,
  Circle,
};
