import { QRCodeDecoderErrorCorrectionLevel } from "@zxing/library";

/**
 * Le niveau de correction d'erreur pour les QR codes.
 * Il permet de lire les informations encodées même si une partie du QR code est endommagée.
 */
export class QrErrorCorrectionLevel {
  private static readonly levels = {
    Auto: new QrErrorCorrectionLevel(
      QRCodeDecoderErrorCorrectionLevel.L,
      "Auto",
    ),
    Low: new QrErrorCorrectionLevel(QRCodeDecoderErrorCorrectionLevel.L, "Low"),
    Medium: new QrErrorCorrectionLevel(
      QRCodeDecoderErrorCorrectionLevel.M,
      "Medium",
    ),
    MediumHigh: new QrErrorCorrectionLevel(
      QRCodeDecoderErrorCorrectionLevel.Q,
      "MediumHigh",
    ),
    High: new QrErrorCorrectionLevel(
      QRCodeDecoderErrorCorrectionLevel.H,
      "High",
    ),
  };

  private constructor(
    public readonly lvl: QRCodeDecoderErrorCorrectionLevel,
    public readonly name: string,
  ) {}

  static get Auto(): QrErrorCorrectionLevel {
    return QrErrorCorrectionLevel.levels.Auto;
  }

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
