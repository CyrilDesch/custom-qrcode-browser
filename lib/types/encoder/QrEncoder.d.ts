type bit = number;
type byte = number;
type int = number;
export declare class QrCode {
    readonly version: int;
    readonly errorCorrectionLevel: Ecc;
    static encodeText(text: string, ecl: Ecc): QrCode;
    static encodeBinary(data: Readonly<Array<byte>>, ecl: Ecc): QrCode;
    static encodeSegments(segs: Readonly<Array<QrSegment>>, ecl: Ecc, minVersion?: int, maxVersion?: int, mask?: int, boostEcl?: boolean): QrCode;
    readonly size: int;
    readonly mask: int;
    readonly modules: Array<Array<boolean>>;
    private readonly isFunction;
    constructor(version: int, errorCorrectionLevel: Ecc, dataCodewords: Readonly<Array<byte>>, msk: int);
    getModule(x: int, y: int): boolean;
    private drawFunctionPatterns;
    private drawFormatBits;
    private drawVersion;
    private drawFinderPattern;
    private drawAlignmentPattern;
    private setFunctionModule;
    private addEccAndInterleave;
    private drawCodewords;
    private applyMask;
    private getPenaltyScore;
    private getAlignmentPatternPositions;
    private static getNumRawDataModules;
    private static getNumDataCodewords;
    private static reedSolomonComputeDivisor;
    private static reedSolomonComputeRemainder;
    private static reedSolomonMultiply;
    private finderPenaltyCountPatterns;
    private finderPenaltyTerminateAndCount;
    private finderPenaltyAddHistory;
    static readonly MIN_VERSION: int;
    static readonly MAX_VERSION: int;
    private static readonly PENALTY_N1;
    private static readonly PENALTY_N2;
    private static readonly PENALTY_N3;
    private static readonly PENALTY_N4;
    private static readonly ECC_CODEWORDS_PER_BLOCK;
    private static readonly NUM_ERROR_CORRECTION_BLOCKS;
}
export declare class QrSegment {
    readonly mode: Mode;
    readonly numChars: int;
    private readonly bitData;
    static makeBytes(data: Readonly<Array<byte>>): QrSegment;
    static makeNumeric(digits: string): QrSegment;
    static makeAlphanumeric(text: string): QrSegment;
    static makeSegments(text: string): Array<QrSegment>;
    static makeEci(assignVal: int): QrSegment;
    static isNumeric(text: string): boolean;
    static isAlphanumeric(text: string): boolean;
    constructor(mode: Mode, numChars: int, bitData: Array<bit>);
    getData(): Array<bit>;
    static getTotalBits(segs: Readonly<Array<QrSegment>>, version: int): number;
    private static toUtf8ByteArray;
    private static readonly NUMERIC_REGEX;
    private static readonly ALPHANUMERIC_REGEX;
    private static readonly ALPHANUMERIC_CHARSET;
}
export declare class Ecc {
    readonly ordinal: int;
    readonly formatBits: int;
    static readonly LOW: Ecc;
    static readonly MEDIUM: Ecc;
    static readonly QUARTILE: Ecc;
    static readonly HIGH: Ecc;
    private constructor();
}
export declare class Mode {
    readonly modeBits: int;
    private readonly numBitsCharCount;
    static readonly NUMERIC: Mode;
    static readonly ALPHANUMERIC: Mode;
    static readonly BYTE: Mode;
    static readonly KANJI: Mode;
    static readonly ECI: Mode;
    private constructor();
    numCharCountBits(ver: int): int;
}
export {};
