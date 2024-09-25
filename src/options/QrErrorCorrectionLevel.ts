import { Ecc } from "../encoder/QrEncoder";

/**
 * Le niveau de correction d'erreur pour les QR codes.
 * Il permet de lire les informations encodées même si une partie du QR code est endommagée.
 */
export class QrErrorCorrectionLevel {
  private static readonly levels = {
    Low: new QrErrorCorrectionLevel(Ecc.LOW, "Low"),
    Medium: new QrErrorCorrectionLevel(Ecc.MEDIUM, "Medium"),
    MediumHigh: new QrErrorCorrectionLevel(Ecc.QUARTILE, "MediumHigh"),
    High: new QrErrorCorrectionLevel(Ecc.HIGH, "High"),
  };

  private constructor(
    public readonly lvl: Ecc,
    public readonly name: string,
  ) {}

  static get Low(): QrErrorCorrectionLevel {
    return QrErrorCorrectionLevel.levels.Low;
  }

  static get Medium(): QrErrorCorrectionLevel {
    return QrErrorCorrectionLevel.levels.Medium;
  }

  static get MediumHigh(): QrErrorCorrectionLevel {
    return QrErrorCorrectionLevel.levels.MediumHigh;
  }

  static get High(): QrErrorCorrectionLevel {
    return QrErrorCorrectionLevel.levels.High;
  }
}
