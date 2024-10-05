import type { QrCodeMatrix } from "../encode/QrCodeMatrix";
import { type QrOptions } from "../options/QrOptions";
import {
  computeViewBoxIncrease,
  createSvgGroupFromElements,
} from "../utils/SvgUtils";
import { eyeFrameSize } from "./shapes/QrEyeFrameShape";

export class QrShapesDesigner {
  usedCoordinates = new Set<string>();

  constructor(
    public qrMatrix: QrCodeMatrix,
    public options: QrOptions,
    public mainSvg: SVGElement,
  ) {}

  get qrXOrigin() {
    return this.shapes.qrCode.qrOriginStart[0];
  }

  get qrYOrigin() {
    return this.shapes.qrCode.qrOriginStart[1];
  }

  get qrXEnd() {
    return this.qrMatrix.size - this.qrXOrigin;
  }

  get qrYEnd() {
    return this.qrMatrix.size - this.qrYOrigin;
  }

  get shapes() {
    return this.options.shapes;
  }

  addUsedCoordinate(x: number, y: number) {
    this.usedCoordinates.add(`${x},${y}`);
  }

  isUsedCoordinate(x: number, y: number) {
    return this.usedCoordinates.has(`${x},${y}`);
  }

  // Get the start coordinates for different QR code elements
  private get qrCodeElementStartCoordinate() {
    const { qrXOrigin, qrYOrigin, qrXEnd, qrYEnd } = this;
    const eyePositions = [
      { x: qrXOrigin, y: qrYOrigin }, // Top-left corner
      { x: qrXEnd - eyeFrameSize, y: qrYOrigin }, // Top-right corner
      { x: qrXOrigin, y: qrYEnd - eyeFrameSize }, // Bottom-left corner
    ];

    return {
      timingLinePosition: {
        x: qrXOrigin + eyeFrameSize - 1,
        y: qrYOrigin + eyeFrameSize - 1,
      },
      eyesFramesPositions: eyePositions,
      eyesPositions: eyePositions.map(({ x, y }) => ({ x: x + 2, y: y + 2 })), // Slight offset for inner eye
      alignmentPatternPosition: { x: qrXEnd - 9, y: qrYEnd - 9 },
    };
  }

  drawSvg() {
    if (!this.qrMatrix) throw new Error("No QR matrix set");

    const { shapes, mainSvg, qrCodeElementStartCoordinate } = this;
    const qrGroupedElements = [];

    // Create background if defined
    if (shapes.background)
      mainSvg.appendChild(shapes.background.createSvgElement(mainSvg));

    // Create timing line if defined
    if (shapes.timingLine) {
      qrGroupedElements.push(
        shapes.timingLine.createSvgElement(
          qrCodeElementStartCoordinate.timingLinePosition.x,
          qrCodeElementStartCoordinate.timingLinePosition.y,
          this,
        ),
      );
    }

    // Create eye frames if defined
    if (shapes.eyeFrame) {
      qrCodeElementStartCoordinate.eyesFramesPositions.forEach(({ x, y }) => {
        qrGroupedElements.push(shapes.eyeFrame!.createSvgElement(x, y, this));
      });
    }

    // Create eye inner parts if defined
    if (shapes.eye) {
      qrCodeElementStartCoordinate.eyesPositions.forEach(({ x, y }) => {
        qrGroupedElements.push(shapes.eye!.createSvgElement(x, y, this));
      });
    }

    // Add logo if defined
    if (shapes.logo)
      qrGroupedElements.push(shapes.logo.createSvgElement(mainSvg, this));

    // Create alignment pattern if defined
    if (shapes.alignmentPattern) {
      qrGroupedElements.push(
        shapes.alignmentPattern.createSvgElement(
          qrCodeElementStartCoordinate.alignmentPatternPosition.x,
          qrCodeElementStartCoordinate.alignmentPatternPosition.y,
          this,
        ),
      );
    }

    // Create QR code matrix
    qrGroupedElements.push(shapes.matrixPixel.createSvgElement(0, 0, this));

    // Group all elements, apply padding, and append to the main SVG
    const g = createSvgGroupFromElements(qrGroupedElements);
    const padding =
      computeViewBoxIncrease(this.qrMatrix.size, this.options.sizeRatio) / 2;
    g.setAttribute("transform", `translate(${padding}, ${padding})`); // To center the QR code if sizeRatio is set
    mainSvg.appendChild(g);
  }
}
