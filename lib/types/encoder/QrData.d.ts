export interface IQrData {
    encode(): string;
}
declare class Text implements IQrData {
    value: string;
    constructor(value: string);
    encode(): string;
}
declare class Url implements IQrData {
    url: string;
    constructor(url: string);
    encode(): string;
}
declare class Email implements IQrData {
    email: string;
    copyTo?: string | undefined;
    subject?: string | undefined;
    body?: string | undefined;
    constructor(email: string, copyTo?: string | undefined, subject?: string | undefined, body?: string | undefined);
    encode(): string;
    private escape;
}
declare class GeoPos implements IQrData {
    lat: number;
    lon: number;
    constructor(lat: number, lon: number);
    encode(): string;
}
declare class Bookmark implements IQrData {
    url: string;
    title: string;
    constructor(url: string, title: string);
    encode(): string;
}
declare enum Authentication {
    WEP = "WEP",
    WPA = "WPA",
    OPEN = "nopass"
}
declare class Wifi implements IQrData {
    authentication?: Authentication | undefined;
    ssid?: string | undefined;
    psk?: string | undefined;
    hidden: boolean;
    constructor(authentication?: Authentication | undefined, ssid?: string | undefined, psk?: string | undefined, hidden?: boolean);
    encode(): string;
    static escape(text: string): string;
}
declare class EnterpriseWifi implements IQrData {
    ssid?: string | undefined;
    psk?: string | undefined;
    hidden: boolean;
    user?: string | undefined;
    eap?: string | undefined;
    phase?: string | undefined;
    constructor(ssid?: string | undefined, psk?: string | undefined, hidden?: boolean, user?: string | undefined, eap?: string | undefined, phase?: string | undefined);
    encode(): string;
}
declare class Phone implements IQrData {
    phoneNumber: string;
    constructor(phoneNumber: string);
    encode(): string;
}
declare class SMS implements IQrData {
    phoneNumber: string;
    subject: string;
    isMMS: boolean;
    constructor(phoneNumber: string, subject: string, isMMS: boolean);
    encode(): string;
}
declare class BizCard implements IQrData {
    firstName?: string | undefined;
    secondName?: string | undefined;
    job?: string | undefined;
    company?: string | undefined;
    address?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    constructor(firstName?: string | undefined, secondName?: string | undefined, job?: string | undefined, company?: string | undefined, address?: string | undefined, phone?: string | undefined, email?: string | undefined);
    encode(): string;
}
declare class VCard implements IQrData {
    name?: string | undefined;
    company?: string | undefined;
    title?: string | undefined;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    website?: string | undefined;
    note?: string | undefined;
    constructor(name?: string | undefined, company?: string | undefined, title?: string | undefined, phoneNumber?: string | undefined, email?: string | undefined, address?: string | undefined, website?: string | undefined, note?: string | undefined);
    encode(): string;
}
declare class MeCard implements IQrData {
    name?: string | undefined;
    address?: string | undefined;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    constructor(name?: string | undefined, address?: string | undefined, phoneNumber?: string | undefined, email?: string | undefined);
    encode(): string;
}
declare class YouTube implements IQrData {
    videoId: string;
    constructor(videoId: string);
    encode(): string;
}
declare class Event implements IQrData {
    uid?: string | undefined;
    stamp?: string | undefined;
    organizer?: string | undefined;
    start?: string | undefined;
    end?: string | undefined;
    summary?: string | undefined;
    constructor(uid?: string | undefined, stamp?: string | undefined, organizer?: string | undefined, start?: string | undefined, end?: string | undefined, summary?: string | undefined);
    encode(): string;
}
declare class GooglePlay implements IQrData {
    appPackage: string;
    constructor(appPackage: string);
    encode(): string;
}
export declare const QrData: {
    Text: typeof Text;
    Url: typeof Url;
    Email: typeof Email;
    GeoPos: typeof GeoPos;
    Bookmark: typeof Bookmark;
    Wifi: typeof Wifi;
    EnterpriseWifi: typeof EnterpriseWifi;
    Phone: typeof Phone;
    SMS: typeof SMS;
    BizCard: typeof BizCard;
    VCard: typeof VCard;
    MeCard: typeof MeCard;
    YouTube: typeof YouTube;
    Event: typeof Event;
    GooglePlay: typeof GooglePlay;
};
export {};
