import { Ecc } from "../encoder/QrEncoder";
export declare class QrErrorCorrectionLevel {
    readonly lvl: Ecc;
    readonly name: string;
    private static readonly levels;
    private constructor();
    static get Low(): QrErrorCorrectionLevel;
    static get Medium(): QrErrorCorrectionLevel;
    static get MediumHigh(): QrErrorCorrectionLevel;
    static get High(): QrErrorCorrectionLevel;
}
