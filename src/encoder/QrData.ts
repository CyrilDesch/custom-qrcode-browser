// Interface de base pour tous les types de QR Data
export interface IQrData {
  encode(): string;
}

// Classe pour les textes simples
class Text implements IQrData {
  constructor(public value: string) {}

  encode(): string {
    return this.value;
  }
}

// Classe pour les URLs
class Url implements IQrData {
  constructor(public url: string) {}

  encode(): string {
    return this.url;
  }
}

// Classe pour les emails
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

// Classe pour les coordonnées géographiques
class GeoPos implements IQrData {
  constructor(
    public lat: number,
    public lon: number,
  ) {}

  encode(): string {
    return `GEO:${this.lat},${this.lon}`;
  }
}

// Classe pour les bookmarks
class Bookmark implements IQrData {
  constructor(
    public url: string,
    public title: string,
  ) {}

  encode(): string {
    return `MEBKM:URL:${this.url};TITLE:${this.title};`;
  }
}

// Namespace pour l'authentification Wi-Fi
enum Authentication {
  WEP = "WEP",
  WPA = "WPA",
  OPEN = "nopass",
}

// Classe pour les Wi-Fi
class Wifi implements IQrData {
  constructor(
    public authentication?: Authentication | undefined,
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
    return text
      .replace(/\\/g, "\\\\")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;")
      .replace(/\./g, "\\.")
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'");
  }
}

// Classe pour le Wi-Fi d'entreprise
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

// Classe pour les numéros de téléphone
class Phone implements IQrData {
  constructor(public phoneNumber: string) {}

  encode(): string {
    return `TEL:${this.phoneNumber}`;
  }
}

// Classe pour les SMS ou MMS
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

// Classe pour les cartes de visite
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

// Classe pour les VCards
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

// Classe pour les MeCards
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

// Classe pour les vidéos YouTube
class YouTube implements IQrData {
  constructor(public videoId: string) {}

  encode(): string {
    return `YOUTUBE:${this.videoId}`;
  }
}

// Classe pour les événements
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

// Classe pour les applications Google Play
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
