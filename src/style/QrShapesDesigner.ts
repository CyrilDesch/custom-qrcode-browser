import type { QrCodeMatrix } from "../encoder/QrCodeMatrix";
import type { QrOptions } from "../options/QrOptions";
import { createSvgGroupFromElements } from "../utils/utils";
import { eyeFrameSize } from "./shapes/QrEyeFrameShape";
import { QrShape } from "./shapes/QrShape";

export class QrShapesDesigner {
  usedCoordinates: Set<string>;

  constructor(
    public qrMatrix: QrCodeMatrix,
    public options: QrOptions,
    public mainSvg: SVGElement,
  ) {
    this.usedCoordinates = new Set<string>();
  }

  get qrXOrigin(): number {
    return this.shapes.qrCode.qrOriginStart[0];
  }

  get qrYOrigin(): number {
    return this.shapes.qrCode.qrOriginStart[1];
  }

  get qrXEnd(): number {
    return this.qrMatrix.size - this.qrXOrigin;
  }

  get qrYEnd(): number {
    return this.qrMatrix.size - this.qrYOrigin;
  }

  get shapes() {
    return this.options.shapes;
  }

  addUsedCoordinate(x: number, y: number): void {
    this.usedCoordinates.add(`${x},${y}`);
  }
  isUsedCoordinate(x: number, y: number): boolean {
    return this.usedCoordinates.has(`${x},${y}`);
  }

  // Get start coordinates for each element
  private get qrCodeElementStartCoordinate() {
    const eyesFramesPositions = [
      { x: this.qrXOrigin, y: this.qrYOrigin }, // Coin supérieur gauche
      { x: this.qrXEnd - eyeFrameSize, y: this.qrYOrigin }, // Coin supérieur droit
      { x: this.qrXOrigin, y: this.qrYEnd - eyeFrameSize }, // Coin inférieur gauche
    ];

    // Coordonnées des cadres autour des yeux
    const eyesPositions = eyesFramesPositions.map((pos) => ({
      x: pos.x + 2,
      y: pos.y + 2,
    }));

    // Coordonnées de la ligne de synchronisation (Timing Pattern)
    const timingLinePosition = {
      x: this.qrXOrigin + eyeFrameSize - 1,
      y: this.qrYOrigin + eyeFrameSize - 1,
    };

    // Coordonnées du pattern d'alignement
    const alignmentPatternPosition = {
      x: this.qrXEnd - 9,
      y: this.qrYEnd - 9,
    };

    return {
      timingLinePosition,
      eyesFramesPositions,
      eyesPositions,
      alignmentPatternPosition,
    };
  }

  drawSvg() {
    if (!this.qrMatrix) {
      throw new Error("No QR matrix set");
    }

    // Draw SVG elements
    if (this.shapes.background) {
      const background = this.shapes.background.createSvgElement(this.mainSvg);
      this.mainSvg.appendChild(background);
    }

    const qrGroupedElements = [];

    if (this.shapes.timingLine) {
      const timingLineSvg = this.shapes.timingLine.createSvgElement(
        this.qrCodeElementStartCoordinate.timingLinePosition.x,
        this.qrCodeElementStartCoordinate.timingLinePosition.y,
        this,
      );
      qrGroupedElements.push(timingLineSvg);
    }

    if (this.shapes.eyeFrame) {
      for (const eyeFrame of this.qrCodeElementStartCoordinate
        .eyesFramesPositions) {
        const eyeFrameSvg = this.shapes.eyeFrame.createSvgElement(
          eyeFrame.x,
          eyeFrame.y,
          this,
        );
        qrGroupedElements.push(eyeFrameSvg);
      }
    }

    if (this.shapes.eye) {
      for (const eye of this.qrCodeElementStartCoordinate.eyesPositions) {
        const eyeSvg = this.shapes.eye.createSvgElement(eye.x, eye.y, this);
        qrGroupedElements.push(eyeSvg);
      }
    }

    if (this.shapes.logo) {
      const logo = this.shapes.logo.createSvgElement(this.mainSvg, this);
      qrGroupedElements.push(logo);
    }

    if (this.shapes.alignmentPattern) {
      const alignmentPatternSvg = this.shapes.alignmentPattern.createSvgElement(
        this.qrCodeElementStartCoordinate.alignmentPatternPosition.x,
        this.qrCodeElementStartCoordinate.alignmentPatternPosition.y,
        this,
      );
      qrGroupedElements.push(alignmentPatternSvg);
    }

    // Draw the QR code matrix
    const darkMatrixSvg = this.shapes.matrix.createSvgElement(0, 0, this);
    qrGroupedElements.push(darkMatrixSvg);

    const g = createSvgGroupFromElements(qrGroupedElements);
    const fixPadding =
      this.options.shapes.qrCode instanceof QrShape.Circle ? 0.45 : 0;
    const padding =
      (this.options.sizeRatio * this.qrMatrix.size) / 2 - fixPadding; // const to fix strange centering;
    g.setAttribute("transform", `translate(${padding}, ${padding})`);
    this.mainSvg.appendChild(g);
  }
}
