// Base interface for all QR Data types
export interface IQrData {
  encode(): string;
}

// Class representing simple text for QR
class Text implements IQrData {
  constructor(public value: string) {}

  encode(): string {
    return this.value;
  }
}

// Class representing URLs for QR
class Url implements IQrData {
  constructor(public url: string) {}

  encode(): string {
    return this.url;
  }
}

// Class representing email data for QR
class Email implements IQrData {
  constructor(
    public email: string,
    public copyTo?: string,
    public subject?: string,
    public body?: string,
  ) {}

  encode(): string {
    const queries: string[] = [];

    if (this.copyTo) queries.push(`cc=${this.copyTo}`);
    if (this.subject) queries.push(`subject=${this.escape(this.subject)}`);
    if (this.body) queries.push(`body=${this.escape(this.body)}`);

    const queryString = queries.length > 0 ? `?${queries.join("&")}` : "";
    return `mailto:${this.email}${queryString}`;
  }

  private escape(text: string): string {
    return encodeURIComponent(text).replace(/\+/g, " ");
  }
}

// Class representing geographic coordinates for QR
class GeoPos implements IQrData {
  constructor(
    public lat: number,
    public lon: number,
  ) {}

  encode(): string {
    return `GEO:${this.lat},${this.lon}`;
  }
}

// Class representing bookmark data for QR
class Bookmark implements IQrData {
  constructor(
    public url: string,
    public title: string,
  ) {}

  encode(): string {
    return `MEBKM:URL:${this.url};TITLE:${this.title};`;
  }
}

// Enum representing Wi-Fi authentication types
enum Authentication {
  WEP = "WEP",
  WPA = "WPA",
  OPEN = "nopass",
}

// Class representing Wi-Fi credentials for QR
class Wifi implements IQrData {
  constructor(
    public authentication?: Authentication,
    public ssid?: string,
    public psk?: string,
    public hidden: boolean = false,
  ) {}

  encode(): string {
    return (
      `WIFI:${this.ssid ? `S:${Wifi.escape(this.ssid)};` : ""}` +
      `${this.authentication ? `T:${this.authentication};` : ""}` +
      `${this.psk ? `P:${Wifi.escape(this.psk)};` : ""}` +
      `H:${this.hidden};`
    );
  }

  static escape(text: string): string {
    return text.replace(/[\\,;."']/g, (match) => `\\${match}`);
  }
}

// Class representing enterprise Wi-Fi credentials for QR
class EnterpriseWifi implements IQrData {
  constructor(
    public ssid?: string,
    public psk?: string,
    public hidden: boolean = false,
    public user?: string,
    public eap?: string,
    public phase?: string,
  ) {}

  encode(): string {
    return (
      `WIFI:${this.ssid ? `S:${Wifi.escape(this.ssid)};` : ""}` +
      `${this.user ? `U:${Wifi.escape(this.user)};` : ""}` +
      `${this.psk ? `P:${Wifi.escape(this.psk)};` : ""}` +
      `${this.eap ? `E:${Wifi.escape(this.eap)};` : ""}` +
      `${this.phase ? `PH:${Wifi.escape(this.phase)};` : ""}` +
      `H:${this.hidden};`
    );
  }
}

// Class representing phone numbers for QR
class Phone implements IQrData {
  constructor(public phoneNumber: string) {}

  encode(): string {
    return `TEL:${this.phoneNumber}`;
  }
}

// Class representing SMS or MMS data for QR
class SMS implements IQrData {
  constructor(
    public phoneNumber: string,
    public subject: string,
    public isMMS: boolean,
  ) {}

  encode(): string {
    return `${this.isMMS ? "MMS" : "SMS"}:${this.phoneNumber}${this.subject ? `:${this.subject}` : ""}`;
  }
}

// Class representing business cards for QR (BizCard format)
class BizCard implements IQrData {
  constructor(
    public firstName?: string,
    public secondName?: string,
    public job?: string,
    public company?: string,
    public address?: string,
    public phone?: string,
    public email?: string,
  ) {}

  encode(): string {
    return (
      `BIZCARD:` +
      `${this.firstName ? `N:${this.firstName};` : ""}` +
      `${this.secondName ? `X:${this.secondName};` : ""}` +
      `${this.job ? `T:${this.job};` : ""}` +
      `${this.company ? `C:${this.company};` : ""}` +
      `${this.address ? `A:${this.address};` : ""}` +
      `${this.phone ? `B:${this.phone};` : ""}` +
      `${this.email ? `E:${this.email};` : ""}` +
      `;`
    );
  }
}

// Class representing VCards for QR
class VCard implements IQrData {
  constructor(
    public name?: string,
    public company?: string,
    public title?: string,
    public phoneNumber?: string,
    public email?: string,
    public address?: string,
    public website?: string,
    public note?: string,
  ) {}

  encode(): string {
    return (
      `BEGIN:VCARD\nVERSION:3.0\n` +
      `${this.name ? `N:${this.name}\n` : ""}` +
      `${this.company ? `ORG:${this.company}\n` : ""}` +
      `${this.title ? `TITLE:${this.title}\n` : ""}` +
      `${this.phoneNumber ? `TEL:${this.phoneNumber}\n` : ""}` +
      `${this.website ? `URL:${this.website}\n` : ""}` +
      `${this.email ? `EMAIL:${this.email}\n` : ""}` +
      `${this.address ? `ADR:${this.address}\n` : ""}` +
      `${this.note ? `NOTE:${this.note}\n` : ""}` +
      `END:VCARD`
    );
  }
}

// Class representing MeCards for QR
class MeCard implements IQrData {
  constructor(
    public name?: string,
    public address?: string,
    public phoneNumber?: string,
    public email?: string,
  ) {}

  encode(): string {
    return (
      `MECARD:` +
      `${this.name ? `N:${this.name};` : ""}` +
      `${this.address ? `ADR:${this.address};` : ""}` +
      `${this.phoneNumber ? `TEL:${this.phoneNumber};` : ""}` +
      `${this.email ? `EMAIL:${this.email};` : ""}` +
      `;`
    );
  }
}

// Class representing YouTube videos for QR
class YouTube implements IQrData {
  constructor(public videoId: string) {}

  encode(): string {
    return `YOUTUBE:${this.videoId}`;
  }
}

// Class representing events for QR (iCalendar format)
class Event implements IQrData {
  constructor(
    public uid?: string,
    public stamp?: string,
    public organizer?: string,
    public start?: string,
    public end?: string,
    public summary?: string,
  ) {}

  encode(): string {
    return (
      `BEGIN:VEVENT\n` +
      `${this.uid ? `UID:${this.uid}\n` : ""}` +
      `${this.stamp ? `DTSTAMP:${this.stamp}\n` : ""}` +
      `${this.organizer ? `ORGANIZER:${this.organizer}\n` : ""}` +
      `${this.start ? `DTSTART:${this.start}\n` : ""}` +
      `${this.end ? `DTEND:${this.end}\n` : ""}` +
      `${this.summary ? `SUMMARY:${this.summary}\n` : ""}` +
      `END:VEVENT`
    );
  }
}

// Class representing Google Play apps for QR
class GooglePlay implements IQrData {
  constructor(public appPackage: string) {}

  encode(): string {
    return `market://details?id=${this.appPackage}`;
  }
}

export const QrData = {
  Text,
  Url,
  Email,
  GeoPos,
  Bookmark,
  Wifi,
  EnterpriseWifi,
  Phone,
  SMS,
  BizCard,
  VCard,
  MeCard,
  YouTube,
  Event,
  GooglePlay,
};
