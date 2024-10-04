/**
 * Statut des voisins des pixels du QR code.
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
